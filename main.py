#!/usr/bin/env python3
"""
CYBERNADE - Cybersecurity Toolkit
Main entry point of the application.
"""
import sys
import os
import logging
from core.app import CybernadeApp, app
from core.config import config

def main():
    """Main entry point of the application."""
    try:
        # Initialize application
        global app
        app = CybernadeApp()
        
        # Log startup
        logging.info("CYBERNADE Application starting")
        
        # Run application
        exit_code = app.run()
        
        # Cleanup
        app.cleanup()
        
        # Return exit code
        return exit_code
    except Exception as e:
        logging.error(f"Unhandled exception: {e}", exc_info=True)
        return 1

if __name__ == "__main__":
    # Make sure current directory is in path
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    
    # Run the application
    sys.exit(main())
