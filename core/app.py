"""
Main application class for CYBERNADE.
"""
import os
import logging
import sys
from datetime import datetime
from PyQt5.QtWidgets import QApplication

from core.config import config
from core.database import db

class CybernadeApp:
    """Main application class for CYBERNADE."""
    
    def __init__(self):
        """Initialize the CYBERNADE application."""
        self.setup_logging()
        self.setup_directories()
        
        # Log application startup
        logging.info("CYBERNADE Application starting...")
        logging.info(f"Version: {config.get('app', 'version')}")
        
        # Initialize Qt Application
        self.app = QApplication(sys.argv)
        self.app.setApplicationName("CYBERNADE")
        self.app.setApplicationVersion(config.get('app', 'version'))
        
        # Set application style based on theme
        self.set_theme(config.get('app', 'theme'))
        
        # Initialize GUI (will be done in run)
        self.main_window = None
        
        # Log initialization complete
        logging.info("CYBERNADE Application initialized")
    
    def setup_logging(self):
        """Setup logging for the application."""
        # Create logs directory if it doesn't exist
        logs_dir = config.get('paths', 'logs')
        os.makedirs(logs_dir, exist_ok=True)
        
        # Set up logging to file
        log_file = os.path.join(logs_dir, f"cybernade_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log")
        
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_file),
                logging.StreamHandler()
            ]
        )
        
        logging.info(f"Logging initialized. Log file: {log_file}")
    
    def setup_directories(self):
        """Setup required directories."""
        # Create exports directory
        exports_dir = config.get('paths', 'exports')
        os.makedirs(exports_dir, exist_ok=True)
        
        # Create subdirectories for exports
        os.makedirs(os.path.join(exports_dir, 'osint'), exist_ok=True)
        os.makedirs(os.path.join(exports_dir, 'network'), exist_ok=True)
        os.makedirs(os.path.join(exports_dir, 'crypto'), exist_ok=True)
        
        logging.info("Application directories created")
    
    def set_theme(self, theme_name):
        """Set the application theme.
        
        Args:
            theme_name (str): Name of the theme (dark, light)
        """
        # Basic implementation for MVP - just dark and light themes
        if theme_name == "dark":
            # Dark theme stylesheet
            self.app.setStyleSheet("""
                QMainWindow, QWidget {
                    background-color: #2D2D30;
                    color: #FFFFFF;
                }
                QPushButton {
                    background-color: #0078D7;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 2px;
                }
                QPushButton:hover {
                    background-color: #1C97EA;
                }
                QLineEdit, QTextEdit, QPlainTextEdit, QComboBox {
                    background-color: #1E1E1E;
                    color: #FFFFFF;
                    border: 1px solid #3F3F3F;
                    border-radius: 2px;
                    padding: 2px;
                }
                QTabWidget::pane {
                    border: 1px solid #3F3F3F;
                    background-color: #252526;
                }
                QTabBar::tab {
                    background-color: #2D2D30;
                    color: #FFFFFF;
                    padding: 5px 10px;
                    border: 1px solid #3F3F3F;
                    border-bottom: none;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;
                }
                QTabBar::tab:selected {
                    background-color: #252526;
                    border-bottom: none;
                }
                QTableView {
                    background-color: #1E1E1E;
                    color: #FFFFFF;
                    gridline-color: #3F3F3F;
                    selection-background-color: #0078D7;
                    selection-color: #FFFFFF;
                }
                QHeaderView::section {
                    background-color: #2D2D30;
                    color: #FFFFFF;
                    padding: 4px;
                    border: 1px solid #3F3F3F;
                }
                QScrollBar {
                    background-color: #2D2D30;
                }
                QLabel {
                    color: #FFFFFF;
                }
                QProgressBar {
                    border: 1px solid #3F3F3F;
                    border-radius: 2px;
                    background-color: #1E1E1E;
                    color: #FFFFFF;
                    text-align: center;
                }
                QProgressBar::chunk {
                    background-color: #0078D7;
                    width: 1px;
                }
            """)
        else:
            # Light theme or default
            self.app.setStyleSheet("")
        
        logging.info(f"Theme set to: {theme_name}")
    
    def run(self):
        """Run the application."""
        from gui.main_window import MainWindow
        
        # Create main window
        self.main_window = MainWindow()
        
        # Show main window
        self.main_window.show()
        
        # Start the application event loop
        return self.app.exec_()
    
    def cleanup(self):
        """Perform cleanup before application exit."""
        # Save configuration
        config.save()
        
        # Log application exit
        logging.info("CYBERNADE Application exiting...")
        
        # Log to database
        db.log_activity("app", "exit", {"version": config.get('app', 'version')})
        
        logging.info("CYBERNADE Application cleanup complete")

# Global application instance (to be initialized in main.py)
app = None 