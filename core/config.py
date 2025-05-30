"""
Configuration management for CYBERNADE.
"""
import json
import os
import logging
from pathlib import Path

# Default configuration
DEFAULT_CONFIG = {
    "app": {
        "version": "1.0.0-mvp",
        "theme": "dark",
        "auto_save": True
    },
    "apis": {
        "shodan_key": "",
        "timeout": 30
    },
    "network": {
        "default_ports": "1-1000",
        "max_threads": 50
    },
    "paths": {
        "exports": "./exports/",
        "logs": "./logs/"
    }
}

class Config:
    """Configuration manager for the CYBERNADE application."""
    
    def __init__(self, config_file="data/configs/config.json"):
        """Initialize the configuration manager.
        
        Args:
            config_file (str): Path to the configuration file
        """
        self.config_file = config_file
        self.config = DEFAULT_CONFIG.copy()
        self.load()
        
    def load(self):
        """Load configuration from file."""
        try:
            if os.path.exists(self.config_file):
                with open(self.config_file, 'r') as f:
                    loaded_config = json.load(f)
                    # Update config with loaded values
                    self._update_nested_dict(self.config, loaded_config)
                logging.info(f"Configuration loaded from {self.config_file}")
            else:
                # Create directories if they don't exist
                os.makedirs(os.path.dirname(self.config_file), exist_ok=True)
                self.save()  # Create default config file
                logging.info(f"Created default configuration at {self.config_file}")
        except Exception as e:
            logging.error(f"Error loading configuration: {e}")
    
    def save(self):
        """Save current configuration to file."""
        try:
            # Create directories if they don't exist
            os.makedirs(os.path.dirname(self.config_file), exist_ok=True)
            
            with open(self.config_file, 'w') as f:
                json.dump(self.config, f, indent=4)
            logging.info(f"Configuration saved to {self.config_file}")
        except Exception as e:
            logging.error(f"Error saving configuration: {e}")
    
    def get(self, section, key=None):
        """Get a configuration value.
        
        Args:
            section (str): Configuration section
            key (str, optional): Configuration key. If None, returns the entire section.
            
        Returns:
            The configuration value or section
        """
        if key is None:
            return self.config.get(section, {})
        return self.config.get(section, {}).get(key)
    
    def set(self, section, key, value):
        """Set a configuration value.
        
        Args:
            section (str): Configuration section
            key (str): Configuration key
            value: The value to set
        """
        if section not in self.config:
            self.config[section] = {}
        self.config[section][key] = value
    
    def create_directories(self):
        """Create necessary directories defined in configuration."""
        for section in self.config:
            for key, value in self.config[section].items():
                if key.endswith('_dir') or key == 'exports' or key == 'logs':
                    os.makedirs(value, exist_ok=True)
                    logging.info(f"Created directory: {value}")
    
    def _update_nested_dict(self, d, u):
        """Update a nested dictionary with another dictionary.
        
        Args:
            d (dict): Dictionary to update
            u (dict): Dictionary with values to update
        """
        for k, v in u.items():
            if isinstance(v, dict) and k in d and isinstance(d[k], dict):
                self._update_nested_dict(d[k], v)
            else:
                d[k] = v

# Global configuration instance
config = Config() 