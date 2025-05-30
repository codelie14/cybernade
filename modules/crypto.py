"""
Cryptography module for CYBERNADE.
Will be fully implemented in Phase 4.
"""
import hashlib
import logging
import base64
import random
import string
from core.database import db

class CryptoModule:
    """Cryptography module for CYBERNADE."""
    
    def __init__(self):
        """Initialize the cryptography module."""
        logging.info("Crypto module initialized")
    
    def calculate_hash(self, data, algorithm="sha256"):
        """Calculate hash of data.
        
        Args:
            data (str): Data to hash
            algorithm (str): Hash algorithm (md5, sha1, sha256, sha512)
            
        Returns:
            str: Hash of data
        """
        data_bytes = data.encode('utf-8') if isinstance(data, str) else data
        
        if algorithm == "md5":
            hash_obj = hashlib.md5(data_bytes)
        elif algorithm == "sha1":
            hash_obj = hashlib.sha1(data_bytes)
        elif algorithm == "sha256":
            hash_obj = hashlib.sha256(data_bytes)
        elif algorithm == "sha512":
            hash_obj = hashlib.sha512(data_bytes)
        else:
            logging.warning(f"Unknown hash algorithm: {algorithm}, using sha256")
            hash_obj = hashlib.sha256(data_bytes)
        
        # Log activity
        logging.info(f"Hash calculated with {algorithm}")
        db.log_activity("crypto", "calculate_hash", {"algorithm": algorithm})
        
        return hash_obj.hexdigest()
    
    def hash_file(self, file_path, algorithm="sha256"):
        """Calculate hash of a file.
        Stub method for Phase 4.
        
        Args:
            file_path (str): Path to file
            algorithm (str): Hash algorithm (md5, sha1, sha256, sha512)
            
        Returns:
            str: Hash of file
        """
        # This is a stub that will be implemented in Phase 4
        logging.info(f"File hash requested for {file_path} using {algorithm}")
        
        # Save to database
        db.log_activity("crypto", "hash_file", {
            "file_path": file_path,
            "algorithm": algorithm
        })
        
        # Return placeholder results
        return {
            "file_path": file_path,
            "algorithm": algorithm,
            "status": "File hash functionality will be implemented in Phase 4"
        }
    
    def encrypt_xor(self, data, key):
        """Encrypt data using XOR.
        Simple implementation for educational purposes.
        
        Args:
            data (str): Data to encrypt
            key (str): Encryption key
            
        Returns:
            str: Base64-encoded encrypted data
        """
        # Convert data and key to bytes if they are strings
        data_bytes = data.encode('utf-8') if isinstance(data, str) else data
        key_bytes = key.encode('utf-8') if isinstance(key, str) else key
        
        # Create a repeating key of the same length as the data
        key_repeated = (key_bytes * (len(data_bytes) // len(key_bytes) + 1))[:len(data_bytes)]
        
        # XOR each byte
        encrypted_bytes = bytes(a ^ b for a, b in zip(data_bytes, key_repeated))
        
        # Convert to base64 for safe storage
        encoded = base64.b64encode(encrypted_bytes).decode('utf-8')
        
        # Log activity
        logging.info("XOR encryption performed")
        db.log_activity("crypto", "encrypt_xor", {})
        
        return encoded
    
    def decrypt_xor(self, encrypted_data, key):
        """Decrypt data using XOR.
        Simple implementation for educational purposes.
        
        Args:
            encrypted_data (str): Base64-encoded encrypted data
            key (str): Encryption key
            
        Returns:
            str: Decrypted data
        """
        # Convert key to bytes if it is a string
        key_bytes = key.encode('utf-8') if isinstance(key, str) else key
        
        # Decode base64
        encrypted_bytes = base64.b64decode(encrypted_data)
        
        # Create a repeating key of the same length as the data
        key_repeated = (key_bytes * (len(encrypted_bytes) // len(key_bytes) + 1))[:len(encrypted_bytes)]
        
        # XOR each byte (same operation as encryption)
        decrypted_bytes = bytes(a ^ b for a, b in zip(encrypted_bytes, key_repeated))
        
        # Convert back to string
        decrypted = decrypted_bytes.decode('utf-8')
        
        # Log activity
        logging.info("XOR decryption performed")
        db.log_activity("crypto", "decrypt_xor", {})
        
        return decrypted
    
    def generate_password(self, length=12, include_special=True):
        """Generate a random password.
        
        Args:
            length (int): Password length
            include_special (bool): Include special characters
            
        Returns:
            str: Random password
        """
        # Define character sets
        chars = string.ascii_letters + string.digits
        
        if include_special:
            chars += string.punctuation
        
        # Generate password
        password = ''.join(random.choice(chars) for _ in range(length))
        
        # Log activity
        logging.info(f"Password generated (length: {length}, special: {include_special})")
        db.log_activity("crypto", "generate_password", {
            "length": length,
            "include_special": include_special
        })
        
        return password
    
    def check_password_strength(self, password):
        """Check the strength of a password.
        Simple implementation for MVP.
        
        Args:
            password (str): Password to check
            
        Returns:
            dict: Password strength assessment
        """
        # Initialize score
        score = 0
        feedback = []
        
        # Check length
        if len(password) < 8:
            feedback.append("Password is too short")
        elif len(password) >= 12:
            score += 2
            feedback.append("Good length")
        else:
            score += 1
        
        # Check for different character types
        if any(c.islower() for c in password):
            score += 1
        else:
            feedback.append("Add lowercase letters")
        
        if any(c.isupper() for c in password):
            score += 1
        else:
            feedback.append("Add uppercase letters")
        
        if any(c.isdigit() for c in password):
            score += 1
        else:
            feedback.append("Add numbers")
        
        if any(c in string.punctuation for c in password):
            score += 1
        else:
            feedback.append("Add special characters")
        
        # Determine strength level
        if score < 3:
            strength = "Weak"
        elif score < 5:
            strength = "Moderate"
        else:
            strength = "Strong"
            if not feedback:
                feedback.append("Excellent password")
        
        # Log activity
        logging.info("Password strength checked")
        db.log_activity("crypto", "check_password_strength", {})
        
        return {
            "strength": strength,
            "score": score,
            "feedback": feedback
        }

# Global crypto module instance
crypto = CryptoModule() 