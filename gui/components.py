"""
Reusable UI components for CYBERNADE application.
"""
import logging
from PyQt5.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QTextEdit, QPushButton,
    QLabel, QLineEdit
)
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QTextCursor, QColor

class LogWidget(QWidget):
    """Widget for displaying log messages."""
    
    def __init__(self, parent=None):
        """Initialize the log widget."""
        super().__init__(parent)
        
        # Set up layout
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        
        # Create log header
        header_layout = QHBoxLayout()
        header_layout.addWidget(QLabel("Log Output"))
        
        # Add clear button
        self.clear_button = QPushButton("Clear")
        self.clear_button.clicked.connect(self.clear)
        header_layout.addWidget(self.clear_button)
        
        layout.addLayout(header_layout)
        
        # Create log text area
        self.log_text = QTextEdit()
        self.log_text.setReadOnly(True)
        layout.addWidget(self.log_text)
        
        # Set up log handler
        self.log_handler = LogHandler(self.log_text)
        logging.getLogger().addHandler(self.log_handler)
    
    def clear(self):
        """Clear the log text area."""
        self.log_text.clear()


class LogHandler(logging.Handler):
    """Custom logging handler that outputs to a QTextEdit widget."""
    
    def __init__(self, text_edit):
        """Initialize the log handler."""
        super().__init__()
        self.text_edit = text_edit
        self.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
    
    def emit(self, record):
        """Emit a log record."""
        msg = self.format(record)
        self.emit_log(msg, record.levelname)
    
    def emit_log(self, message, level="INFO"):
        """Add a log message to the text edit."""
        # Set color based on level
        color = QColor(Qt.black)
        if level == "ERROR":
            color = QColor(Qt.red)
        elif level == "WARNING":
            color = QColor(Qt.darkYellow)
        elif level == "INFO":
            color = QColor(Qt.blue)
        
        # Move cursor to end
        self.text_edit.moveCursor(QTextCursor.End)
        
        # Set text color
        self.text_edit.setTextColor(color)
        
        # Add new line if not empty
        if not self.text_edit.toPlainText() == "":
            self.text_edit.insertPlainText("\n")
        
        # Add message
        self.text_edit.insertPlainText(message)
        
        # Move cursor to end
        self.text_edit.moveCursor(QTextCursor.End) 