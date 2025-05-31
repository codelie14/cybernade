"""
OSINT (Open Source Intelligence) module for CYBERNADE.
"""
import re
import logging
import ipaddress
import socket
import json
import time
import requests
import whois
import dns.resolver
from datetime import datetime
from core.database import db
from core.config import config
from utils.helpers import export_to_file, get_timestamp

class GeoLocationAPI:
    """IP Geolocation API client."""
    
    def __init__(self):
        """Initialize the geolocation API client."""
        self.base_url = "https://ipapi.co/{}/json/"
        self.timeout = config.get("apis", "timeout") or 30
    
    def lookup(self, ip):
        """Lookup IP geolocation information.
        
        Args:
            ip (str): IP address to lookup
            
        Returns:
            dict: Geolocation information
        """
        try:
            url = self.base_url.format(ip)
            response = requests.get(url, timeout=self.timeout)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check for error
                if "error" in data:
                    logging.error(f"Geolocation error for {ip}: {data['error']}")
                    return {"error": data["error"]}
                
                return {
                    "ip": data.get("ip"),
                    "city": data.get("city"),
                    "region": data.get("region"),
                    "country": data.get("country_name"),
                    "postal": data.get("postal"),
                    "latitude": data.get("latitude"),
                    "longitude": data.get("longitude"),
                    "asn": data.get("asn"),
                    "org": data.get("org"),
                    "timezone": data.get("timezone")
                }
            else:
                logging.error(f"Geolocation API error: HTTP {response.status_code}")
                return {"error": f"HTTP Error: {response.status_code}"}
        except Exception as e:
            logging.error(f"Geolocation API exception: {e}")
            return {"error": str(e)}


class WHOISClient:
    """WHOIS client wrapper."""
    
    def __init__(self):
        """Initialize the WHOIS client."""
        pass
    
    def lookup(self, domain):
        """Lookup WHOIS information for a domain.
        
        Args:
            domain (str): Domain to lookup
            
        Returns:
            dict: WHOIS information
        """
        try:
            # Get WHOIS data
            whois_data = whois.whois(domain)
            
            # Format dates
            creation_date = whois_data.creation_date
            expiration_date = whois_data.expiration_date
            updated_date = whois_data.updated_date
            
            # Handle multiple dates (returned as list)
            if isinstance(creation_date, list):
                creation_date = creation_date[0]
            if isinstance(expiration_date, list):
                expiration_date = expiration_date[0]
            if isinstance(updated_date, list):
                updated_date = updated_date[0]
                
            # Format dates as strings if they are datetime objects
            creation_date_str = creation_date.strftime("%Y-%m-%d") if isinstance(creation_date, datetime) else str(creation_date)
            expiration_date_str = expiration_date.strftime("%Y-%m-%d") if isinstance(expiration_date, datetime) else str(expiration_date)
            updated_date_str = updated_date.strftime("%Y-%m-%d") if isinstance(updated_date, datetime) else str(updated_date)
            
            # Create result dictionary
            result = {
                "domain": domain,
                "registrar": whois_data.registrar,
                "creation_date": creation_date_str,
                "expiration_date": expiration_date_str,
                "updated_date": updated_date_str,
                "name_servers": whois_data.name_servers if isinstance(whois_data.name_servers, list) else [whois_data.name_servers],
                "status": whois_data.status if isinstance(whois_data.status, list) else [whois_data.status],
                "emails": whois_data.emails if isinstance(whois_data.emails, list) else [whois_data.emails],
                "dnssec": whois_data.dnssec,
                "registrant": {
                    "name": whois_data.registrant_name,
                    "organization": whois_data.org,
                    "country": whois_data.country
                }
            }
            
            return result
        except Exception as e:
            logging.error(f"WHOIS error for {domain}: {e}")
            return {"error": str(e)}


class DNSClient:
    """DNS client for lookups."""
    
    def __init__(self):
        """Initialize the DNS client."""
        self.resolver = dns.resolver.Resolver()
        self.resolver.timeout = config.get("apis", "timeout") or 30
        self.resolver.lifetime = config.get("apis", "timeout") or 30
    
    def lookup(self, domain, record_type="A"):
        """Lookup DNS records for a domain.
        
        Args:
            domain (str): Domain to lookup
            record_type (str): DNS record type (A, AAAA, MX, NS, TXT, etc.)
            
        Returns:
            dict: DNS records
        """
        try:
            answers = self.resolver.resolve(domain, record_type)
            
            results = {
                "domain": domain,
                "type": record_type,
                "records": []
            }
            
            for rdata in answers:
                if record_type == "A" or record_type == "AAAA":
                    results["records"].append(str(rdata.address))
                elif record_type == "MX":
                    results["records"].append({
                        "preference": rdata.preference,
                        "exchange": str(rdata.exchange)
                    })
                elif record_type == "NS":
                    results["records"].append(str(rdata.target))
                elif record_type == "TXT":
                    results["records"].append(str(rdata))
                elif record_type == "SOA":
                    results["records"].append({
                        "mname": str(rdata.mname),
                        "rname": str(rdata.rname),
                        "serial": rdata.serial,
                        "refresh": rdata.refresh,
                        "retry": rdata.retry,
                        "expire": rdata.expire,
                        "minimum": rdata.minimum
                    })
                else:
                    results["records"].append(str(rdata))
            
            return results
        except Exception as e:
            logging.error(f"DNS lookup error for {domain} ({record_type}): {e}")
            return {
                "domain": domain,
                "type": record_type,
                "error": str(e)
            }
    
    def lookup_all(self, domain):
        """Lookup all common DNS records for a domain.
        
        Args:
            domain (str): Domain to lookup
            
        Returns:
            dict: All DNS records
        """
        record_types = ["A", "AAAA", "MX", "NS", "TXT", "SOA"]
        results = {}
        
        for record_type in record_types:
            try:
                results[record_type] = self.lookup(domain, record_type)
            except Exception as e:
                results[record_type] = {
                    "domain": domain,
                    "type": record_type,
                    "error": str(e)
                }
        
        return results


class ShodanAPI:
    """Shodan API client."""
    
    def __init__(self):
        """Initialize the Shodan API client."""
        self.api_key = config.get("apis", "shodan_key")
        
        # Flag to track if Shodan API is available
        self.available = False
        
        # Import Shodan if API key is available
        if self.api_key:
            try:
                import shodan
                self.api = shodan.Shodan(self.api_key)
                self.available = True
                logging.info("Shodan API initialized")
            except ImportError:
                logging.warning("Shodan module not available")
            except Exception as e:
                logging.error(f"Shodan API initialization error: {e}")
    
    def lookup_ip(self, ip):
        """Lookup information about an IP address on Shodan.
        
        Args:
            ip (str): IP address to lookup
            
        Returns:
            dict: Shodan information about the IP
        """
        if not self.available:
            return {"error": "Shodan API not available"}
        
        try:
            # Lookup the IP
            result = self.api.host(ip)
            
            # Extract relevant information
            return {
                "ip": ip,
                "hostnames": result.get("hostnames", []),
                "country": result.get("country_name"),
                "city": result.get("city"),
                "org": result.get("org"),
                "isp": result.get("isp"),
                "asn": result.get("asn"),
                "os": result.get("os"),
                "ports": result.get("ports", []),
                "vulns": result.get("vulns", []),
                "last_update": result.get("last_update"),
                "tags": result.get("tags", [])
            }
        except Exception as e:
            logging.error(f"Shodan API error for {ip}: {e}")
            return {"error": str(e)}


class EmailVerifier:
    """Email verification utility."""
    
    def __init__(self):
        """Initialize the email verifier."""
        pass
    
    def validate_format(self, email):
        """Validate email format.
        
        Args:
            email (str): Email to validate
            
        Returns:
            bool: True if valid format, False otherwise
        """
        # Basic email format validation
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(email_regex, email))
    
    def validate_domain(self, email):
        """Validate email domain.
        
        Args:
            email (str): Email to validate
            
        Returns:
            bool: True if domain exists, False otherwise
        """
        # Extract domain
        domain = email.split('@')[1]
        
        try:
            # Check if MX records exist
            dns_client = DNSClient()
            mx_records = dns_client.lookup(domain, "MX")
            
            if "error" in mx_records:
                return False
            
            return len(mx_records.get("records", [])) > 0
        except Exception:
            return False
    
    def verify(self, email):
        """Verify an email address.
        
        Args:
            email (str): Email to verify
            
        Returns:
            dict: Verification results
        """
        results = {
            "email": email,
            "format_valid": False,
            "domain_exists": False,
            "has_mx_records": False
        }
        
        # Validate format
        results["format_valid"] = self.validate_format(email)
        
        if not results["format_valid"]:
            return results
        
        # Extract domain
        domain = email.split('@')[1]
        
        # Check if domain exists
        try:
            socket.gethostbyname(domain)
            results["domain_exists"] = True
        except socket.error:
            return results
        
        # Check MX records
        try:
            dns_client = DNSClient()
            mx_records = dns_client.lookup(domain, "MX")
            results["has_mx_records"] = len(mx_records.get("records", [])) > 0
        except Exception:
            pass
        
        return results


class OSINTModule:
    """OSINT module for CYBERNADE."""
    
    def __init__(self):
        """Initialize the OSINT module."""
        logging.info("OSINT module initialized")
        
        # Initialize API clients
        self.apis = {
            'geo': GeoLocationAPI(),
            'whois': WHOISClient(),
            'dns': DNSClient(),
            'shodan': ShodanAPI(),
            'email': EmailVerifier()
        }
    
    def auto_detect_target_type(self, target):
        """Auto-detect the type of target.
        
        Args:
            target (str): Target to analyze
            
        Returns:
            str: Type of target (ip, domain, email, unknown)
        """
        target = target.strip()
        
        # Check if IP address
        try:
            ipaddress.ip_address(target)
            return "ip"
        except ValueError:
            pass
        
        # Check if email
        if re.match(r"[^@]+@[^@]+\.[^@]+", target):
            return "email"
        
        # Check if domain
        if re.match(r"^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$", target.lower()):
            return "domain"
        
        # Unknown
        return "unknown"
    
    def search_ip(self, ip):
        """Search information about an IP address.
        
        Args:
            ip (str): IP address to search
            
        Returns:
            dict: Results of the search
        """
        logging.info(f"IP search requested for {ip}")
        start_time = time.time()
        
        # Initialize results
        results = {
            "target": ip,
            "type": "ip",
            "timestamp": get_timestamp(),
            "geolocation": None,
            "shodan": None
        }
        
        # Validate IP
        try:
            ipaddress.ip_address(ip)
        except ValueError:
            results["error"] = "Invalid IP address format"
            return results
        
        # Get geolocation
        geo_results = self.apis['geo'].lookup(ip)
        results["geolocation"] = geo_results
        
        # Get Shodan data if available
        shodan_results = self.apis['shodan'].lookup_ip(ip)
        results["shodan"] = shodan_results
        
        # Calculate execution time
        results["execution_time"] = time.time() - start_time
        
        # Save to database
        self._save_to_database(ip, "ip", results)
        
        return results
    
    def search_domain(self, domain):
        """Search information about a domain.
        
        Args:
            domain (str): Domain to search
            
        Returns:
            dict: Results of the search
        """
        logging.info(f"Domain search requested for {domain}")
        start_time = time.time()
        
        # Initialize results
        results = {
            "target": domain,
            "type": "domain",
            "timestamp": get_timestamp(),
            "whois": None,
            "dns": None
        }
        
        # Validate domain format
        if not re.match(r"^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$", domain.lower()):
            results["error"] = "Invalid domain format"
            return results
        
        # Get WHOIS data
        whois_results = self.apis['whois'].lookup(domain)
        results["whois"] = whois_results
        
        # Get DNS data
        dns_results = self.apis['dns'].lookup_all(domain)
        results["dns"] = dns_results
        
        # Try to get IP of domain
        try:
            ip = socket.gethostbyname(domain)
            results["ip"] = ip
            
            # Get geolocation of IP
            geo_results = self.apis['geo'].lookup(ip)
            results["geolocation"] = geo_results
        except socket.error:
            results["ip"] = None
        
        # Calculate execution time
        results["execution_time"] = time.time() - start_time
        
        # Save to database
        self._save_to_database(domain, "domain", results)
        
        return results
    
    def search_email(self, email):
        """Search information about an email.
        
        Args:
            email (str): Email to search
            
        Returns:
            dict: Results of the search
        """
        logging.info(f"Email search requested for {email}")
        start_time = time.time()
        
        # Initialize results
        results = {
            "target": email,
            "type": "email",
            "timestamp": get_timestamp(),
            "verification": None,
            "domain_info": None
        }
        
        # Validate email format
        if not self.apis['email'].validate_format(email):
            results["error"] = "Invalid email format"
            return results
        
        # Verify email
        verification_results = self.apis['email'].verify(email)
        results["verification"] = verification_results
        
        # Get domain information
        if verification_results["domain_exists"]:
            domain = email.split('@')[1]
            domain_results = self.search_domain(domain)
            results["domain_info"] = domain_results
        
        # Calculate execution time
        results["execution_time"] = time.time() - start_time
        
        # Save to database
        self._save_to_database(email, "email", results)
        
        return results
    
    def search(self, target):
        """Search information about a target.
        
        Args:
            target (str): Target to search
            
        Returns:
            dict: Results of the search
        """
        target_type = self.auto_detect_target_type(target)
        
        if target_type == "ip":
            return self.search_ip(target)
        elif target_type == "domain":
            return self.search_domain(target)
        elif target_type == "email":
            return self.search_email(target)
        else:
            logging.warning(f"Unknown target type: {target}")
            return {
                "target": target,
                "type": "unknown",
                "error": "Unknown target type"
            }
    
    def export_results(self, results, file_path=None):
        """Export search results to a file.
        
        Args:
            results (dict): Search results
            file_path (str, optional): Path to export file. If None, a default path will be used.
            
        Returns:
            str: Path to the exported file
        """
        if not file_path:
            # Create default file path
            target = results.get("target", "unknown")
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            file_path = f"exports/osint/{target}_{timestamp}.txt"
        
        # Export to file
        success = export_to_file(results, file_path, "txt")
        
        if success:
            logging.info(f"Results exported to {file_path}")
            return file_path
        else:
            logging.error("Failed to export results")
            return None
    
    def _save_to_database(self, target, target_type, results):
        """Save search results to database.
        
        Args:
            target (str): Target of the search
            target_type (str): Type of target (ip, domain, email)
            results (dict): Results of the search
            
        Returns:
            int: ID of the inserted record
        """
        try:
            # Convert results to JSON
            results_json = json.dumps(results)
            
            # Save to database
            record_id = db.save_osint_result(target, target_type, results)
            
            logging.info(f"Search results saved to database (ID: {record_id})")
            return record_id
        except Exception as e:
            logging.error(f"Error saving search results to database: {e}")
            return None
    
    def get_history(self, limit=10):
        """Get search history.
        
        Args:
            limit (int): Maximum number of records to return
            
        Returns:
            list: List of history records
        """
        return db.get_osint_history(limit)

# Global OSINT module instance
osint = OSINTModule() 