"""
Database management for CYBERNADE.
"""
import sqlite3
import json
import os
import logging
from datetime import datetime
from utils.helpers import get_timestamp

class Database:
    """SQLite database manager for CYBERNADE."""
    
    def __init__(self, db_file="data/cybernade.db"):
        """Initialize the database manager.
        
        Args:
            db_file (str): Path to the SQLite database file
        """
        self.db_file = db_file
        self._create_tables()
    
    def _get_connection(self):
        """Get a database connection.
        
        Returns:
            sqlite3.Connection: A connection to the database
        """
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(self.db_file), exist_ok=True)
        
        conn = sqlite3.connect(self.db_file)
        conn.row_factory = sqlite3.Row
        return conn
    
    def _create_tables(self):
        """Create database tables if they don't exist."""
        tables = [
            """
            CREATE TABLE IF NOT EXISTS osint_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                target TEXT NOT NULL,
                target_type TEXT NOT NULL,
                timestamp DATETIME NOT NULL,
                results TEXT
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS network_scans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                target TEXT NOT NULL,
                scan_type TEXT NOT NULL,
                timestamp DATETIME NOT NULL,
                results TEXT
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS activity_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                module TEXT NOT NULL,
                action TEXT NOT NULL,
                timestamp DATETIME NOT NULL,
                details TEXT
            )
            """
        ]
        
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            for table_sql in tables:
                cursor.execute(table_sql)
            
            conn.commit()
            logging.info("Database tables created successfully")
        except Exception as e:
            logging.error(f"Error creating database tables: {e}")
        finally:
            if conn:
                conn.close()
    
    def log_activity(self, module, action, details=None):
        """Log an activity in the database.
        
        Args:
            module (str): Module name
            action (str): Action performed
            details (dict, optional): Additional details
        
        Returns:
            int: ID of the inserted record
        """
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            timestamp = get_timestamp()
            details_json = json.dumps(details) if details else None
            
            cursor.execute(
                "INSERT INTO activity_logs (module, action, timestamp, details) VALUES (?, ?, ?, ?)",
                (module, action, timestamp, details_json)
            )
            
            conn.commit()
            last_id = cursor.lastrowid
            logging.info(f"Activity logged: {module} - {action}")
            return last_id
        except Exception as e:
            logging.error(f"Error logging activity: {e}")
            return None
        finally:
            if conn:
                conn.close()
    
    def save_osint_result(self, target, target_type, results):
        """Save OSINT search results.
        
        Args:
            target (str): Target of the search
            target_type (str): Type of target (ip, domain, email)
            results (dict): Results of the search
            
        Returns:
            int: ID of the inserted record
        """
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            timestamp = get_timestamp()
            results_json = json.dumps(results)
            
            cursor.execute(
                "INSERT INTO osint_history (target, target_type, timestamp, results) VALUES (?, ?, ?, ?)",
                (target, target_type, timestamp, results_json)
            )
            
            conn.commit()
            last_id = cursor.lastrowid
            logging.info(f"OSINT result saved for {target}")
            return last_id
        except Exception as e:
            logging.error(f"Error saving OSINT result: {e}")
            return None
        finally:
            if conn:
                conn.close()
    
    def save_network_scan(self, target, scan_type, results):
        """Save network scan results.
        
        Args:
            target (str): Target of the scan
            scan_type (str): Type of scan
            results (dict): Results of the scan
            
        Returns:
            int: ID of the inserted record
        """
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            timestamp = get_timestamp()
            results_json = json.dumps(results)
            
            cursor.execute(
                "INSERT INTO network_scans (target, scan_type, timestamp, results) VALUES (?, ?, ?, ?)",
                (target, scan_type, timestamp, results_json)
            )
            
            conn.commit()
            last_id = cursor.lastrowid
            logging.info(f"Network scan result saved for {target}")
            return last_id
        except Exception as e:
            logging.error(f"Error saving network scan result: {e}")
            return None
        finally:
            if conn:
                conn.close()
    
    def get_osint_history(self, limit=10):
        """Get OSINT search history.
        
        Args:
            limit (int): Maximum number of records to return
            
        Returns:
            list: List of history records
        """
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            cursor.execute(
                "SELECT * FROM osint_history ORDER BY timestamp DESC LIMIT ?",
                (limit,)
            )
            
            rows = cursor.fetchall()
            history = []
            
            for row in rows:
                item = dict(row)
                item['results'] = json.loads(item['results']) if item['results'] else None
                history.append(item)
            
            return history
        except Exception as e:
            logging.error(f"Error retrieving OSINT history: {e}")
            return []
        finally:
            if conn:
                conn.close()
    
    def get_network_scan_history(self, limit=10):
        """Get network scan history.
        
        Args:
            limit (int): Maximum number of records to return
            
        Returns:
            list: List of history records
        """
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            
            cursor.execute(
                "SELECT * FROM network_scans ORDER BY timestamp DESC LIMIT ?",
                (limit,)
            )
            
            rows = cursor.fetchall()
            history = []
            
            for row in rows:
                item = dict(row)
                item['results'] = json.loads(item['results']) if item['results'] else None
                history.append(item)
            
            return history
        except Exception as e:
            logging.error(f"Error retrieving network scan history: {e}")
            return []
        finally:
            if conn:
                conn.close()

# Global database instance
db = Database() 