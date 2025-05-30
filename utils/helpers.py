"""
Helper functions for CYBERNADE.
"""
import os
import logging
import time
import json
from datetime import datetime

def get_timestamp():
    """Get current timestamp in a readable format.
    
    Returns:
        str: Formatted timestamp
    """
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def export_to_file(data, file_path, file_format="txt"):
    """Export data to a file.
    
    Args:
        data: Data to export
        file_path (str): Path to export file
        file_format (str): Format of the export (txt, json, csv)
        
    Returns:
        bool: Success or failure
    """
    try:
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        if file_format == "json":
            with open(file_path, 'w') as f:
                json.dump(data, f, indent=4)
        elif file_format == "csv":
            if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict):
                # Data is a list of dictionaries
                with open(file_path, 'w') as f:
                    # Write header
                    f.write(','.join(data[0].keys()) + '\n')
                    
                    # Write rows
                    for item in data:
                        f.write(','.join(str(item[key]) for key in data[0].keys()) + '\n')
            else:
                logging.error("Data is not in the correct format for CSV export")
                return False
        else:
            # Default to text format
            with open(file_path, 'w') as f:
                if isinstance(data, dict):
                    for key, value in data.items():
                        f.write(f"{key}: {value}\n")
                elif isinstance(data, list):
                    for item in data:
                        f.write(f"{item}\n")
                else:
                    f.write(str(data))
        
        logging.info(f"Data exported to {file_path}")
        return True
    except Exception as e:
        logging.error(f"Error exporting data: {e}")
        return False

def format_time_elapsed(start_time):
    """Format elapsed time.
    
    Args:
        start_time (float): Start time from time.time()
        
    Returns:
        str: Formatted elapsed time
    """
    elapsed = time.time() - start_time
    
    if elapsed < 1:
        return f"{elapsed*1000:.0f} ms"
    elif elapsed < 60:
        return f"{elapsed:.2f} seconds"
    else:
        minutes = int(elapsed // 60)
        seconds = elapsed % 60
        return f"{minutes} min {seconds:.2f} sec"

def sanitize_filename(filename):
    """Sanitize a filename by removing invalid characters.
    
    Args:
        filename (str): Filename to sanitize
        
    Returns:
        str: Sanitized filename
    """
    # Replace invalid characters with underscore
    invalid_chars = '<>:"/\\|?*'
    for char in invalid_chars:
        filename = filename.replace(char, '_')
    
    return filename

def human_readable_size(size_bytes):
    """Convert size in bytes to human-readable format.
    
    Args:
        size_bytes (int): Size in bytes
        
    Returns:
        str: Human-readable size
    """
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes/1024:.2f} KB"
    elif size_bytes < 1024 * 1024 * 1024:
        return f"{size_bytes/(1024*1024):.2f} MB"
    else:
        return f"{size_bytes/(1024*1024*1024):.2f} GB" 