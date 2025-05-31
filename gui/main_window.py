"""
Main window for CYBERNADE application.
"""
import sys
import logging
from PyQt5.QtWidgets import (
    QMainWindow, QTabWidget, QVBoxLayout, QHBoxLayout, QWidget,
    QPushButton, QLabel, QStatusBar, QTextEdit, QAction, QMenu, QMessageBox,
    QToolBar, QFileDialog, QSplitter
)
from PyQt5.QtCore import Qt, QSize
from PyQt5.QtGui import QIcon, QTextCursor

from core.config import config
from core.database import db
from gui.components import LogWidget, OSINTWidget

class MainWindow(QMainWindow):
    """Main window of the CYBERNADE application."""
    
    def __init__(self):
        """Initialize the main window."""
        super().__init__()
        
        # Set window properties
        self.setWindowTitle(f"CYBERNADE - {config.get('app', 'version')}")
        self.setMinimumSize(800, 600)
        self.resize(1024, 768)
        
        # Log window creation
        logging.info("Main window initializing")
        db.log_activity("gui", "main_window_init")
        
        # Set up UI components
        self._setup_ui()
        
        # Connect signals and slots
        self._connect_signals()
        
        # Log window ready
        logging.info("Main window initialized")
    
    def _setup_ui(self):
        """Set up the UI components."""
        # Create central widget and layout
        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)
        self.main_layout = QVBoxLayout(self.central_widget)
        
        # Create menu bar
        self._create_menu_bar()
        
        # Create splitter for main content and logs
        self.splitter = QSplitter(Qt.Vertical)
        self.main_layout.addWidget(self.splitter)
        
        # Create tab widget for main content
        self.tab_widget = QTabWidget()
        self.splitter.addWidget(self.tab_widget)
        
        # Create OSINT tab
        self.osint_tab = QWidget()
        self.tab_widget.addTab(self.osint_tab, "OSINT")
        
        # Create Network tab
        self.network_tab = QWidget()
        self.tab_widget.addTab(self.network_tab, "Network")
        
        # Create Crypto tab
        self.crypto_tab = QWidget()
        self.tab_widget.addTab(self.crypto_tab, "Crypto")
        
        # Create About tab
        self.about_tab = QWidget()
        self.tab_widget.addTab(self.about_tab, "About")
        
        # Create log widget
        self.log_widget = LogWidget()
        self.splitter.addWidget(self.log_widget)
        
        # Set splitter sizes - 70% for tabs, 30% for logs
        self.splitter.setSizes([700, 300])
        
        # Create toolbar - Maintenant après avoir créé log_widget
        self._create_toolbar()
        
        # Create status bar
        self.status_bar = QStatusBar()
        self.setStatusBar(self.status_bar)
        
        # Add status indicators
        self.status_label = QLabel("Ready")
        self.status_bar.addWidget(self.status_label, 1)
        
        # Add version label to right side
        self.version_label = QLabel(f"v{config.get('app', 'version')}")
        self.status_bar.addPermanentWidget(self.version_label)
        
        # Setup content for each tab
        self._setup_osint_tab()
        self._setup_network_tab()
        self._setup_crypto_tab()
        self._setup_about_tab()
    
    def _create_menu_bar(self):
        """Create the menu bar."""
        # File menu
        file_menu = self.menuBar().addMenu("File")
        
        # Export action
        export_action = QAction("Export Results", self)
        export_action.setShortcut("Ctrl+E")
        export_action.triggered.connect(self._export_results)
        file_menu.addAction(export_action)
        
        file_menu.addSeparator()
        
        # Exit action
        exit_action = QAction("Exit", self)
        exit_action.setShortcut("Ctrl+Q")
        exit_action.triggered.connect(self.close)
        file_menu.addAction(exit_action)
        
        # Edit menu
        edit_menu = self.menuBar().addMenu("Edit")
        
        # Preferences action
        preferences_action = QAction("Preferences", self)
        preferences_action.setShortcut("Ctrl+P")
        preferences_action.triggered.connect(self._show_preferences)
        edit_menu.addAction(preferences_action)
        
        # Help menu
        help_menu = self.menuBar().addMenu("Help")
        
        # About action
        about_action = QAction("About", self)
        about_action.triggered.connect(self._show_about)
        help_menu.addAction(about_action)
    
    def _create_toolbar(self):
        """Create the toolbar."""
        self.toolbar = QToolBar()
        self.toolbar.setMovable(False)
        self.toolbar.setIconSize(QSize(24, 24))
        self.addToolBar(self.toolbar)
        
        # OSINT button
        osint_action = QAction("OSINT", self)
        osint_action.triggered.connect(lambda: self.tab_widget.setCurrentIndex(0))
        self.toolbar.addAction(osint_action)
        
        # Network button
        network_action = QAction("Network", self)
        network_action.triggered.connect(lambda: self.tab_widget.setCurrentIndex(1))
        self.toolbar.addAction(network_action)
        
        # Crypto button
        crypto_action = QAction("Crypto", self)
        crypto_action.triggered.connect(lambda: self.tab_widget.setCurrentIndex(2))
        self.toolbar.addAction(crypto_action)
        
        self.toolbar.addSeparator()
        
        # Clear logs button
        clear_logs_action = QAction("Clear Logs", self)
        clear_logs_action.triggered.connect(self.log_widget.clear)
        self.toolbar.addAction(clear_logs_action)
    
    def _setup_osint_tab(self):
        """Set up the OSINT tab."""
        # Create layout
        layout = QVBoxLayout(self.osint_tab)
        
        # Create OSINT widget
        self.osint_widget = OSINTWidget()
        layout.addWidget(self.osint_widget)
    
    def _setup_network_tab(self):
        """Set up the Network tab."""
        # Add a placeholder message for now - to be implemented in modules/network_scan.py
        layout = QVBoxLayout(self.network_tab)
        layout.addWidget(QLabel("Network module will be implemented in Phase 3"))
    
    def _setup_crypto_tab(self):
        """Set up the Crypto tab."""
        # Add a placeholder message for now - to be implemented in modules/crypto.py
        layout = QVBoxLayout(self.crypto_tab)
        layout.addWidget(QLabel("Crypto module will be implemented in Phase 4"))
    
    def _setup_about_tab(self):
        """Set up the About tab."""
        layout = QVBoxLayout(self.about_tab)
        
        about_text = QTextEdit()
        about_text.setReadOnly(True)
        about_text.setHtml(f"""
        <h1>CYBERNADE</h1>
        <p>Version: {config.get('app', 'version')}</p>
        <p>A versatile cybersecurity toolkit for security professionals and enthusiasts.</p>
        <h2>Features:</h2>
        <ul>
            <li>OSINT reconnaissance tools</li>
            <li>Network scanning utilities</li>
            <li>Cryptography tools</li>
        </ul>
        <p>CYBERNADE is an educational and security testing tool.</p>
        <p>Always use responsibly and only on systems you own or have permission to test.</p>
        <h2>Disclaimer:</h2>
        <p>This tool is provided for legitimate security testing and educational purposes only.</p>
        <p>The developers are not responsible for any misuse of this software.</p>
        """)
        
        layout.addWidget(about_text)
    
    def _connect_signals(self):
        """Connect signals and slots."""
        # Tab changed signal
        self.tab_widget.currentChanged.connect(self._tab_changed)
    
    def _tab_changed(self, index):
        """Handle tab changed event.
        
        Args:
            index (int): Index of the new tab
        """
        tab_name = self.tab_widget.tabText(index)
        self.status_label.setText(f"Module: {tab_name}")
        logging.info(f"Switched to {tab_name} tab")
        db.log_activity("gui", "tab_changed", {"tab": tab_name})
    
    def _export_results(self):
        """Export results from the current tab."""
        current_tab = self.tab_widget.currentWidget()
        tab_name = self.tab_widget.tabText(self.tab_widget.currentIndex())
        
        # If in OSINT tab, use its export function
        if tab_name == "OSINT":
            self.osint_widget._export_results()
        else:
            # Show a message for the MVP since export functionality will be implemented with each module
            QMessageBox.information(
                self,
                "Export Results",
                f"Export functionality for {tab_name} will be implemented with the module"
            )
        
        logging.info(f"Export requested for {tab_name} tab")
    
    def _show_preferences(self):
        """Show preferences dialog."""
        # Simple preferences message for MVP
        QMessageBox.information(
            self,
            "Preferences",
            "Preferences dialog will be implemented in a future version"
        )
        
        logging.info("Preferences dialog requested")
    
    def _show_about(self):
        """Show about dialog."""
        # Switch to the About tab
        self.tab_widget.setCurrentIndex(3)
    
    def closeEvent(self, event):
        """Handle window close event.
        
        Args:
            event: Close event
        """
        # Log application exit
        logging.info("Main window closing")
        db.log_activity("gui", "main_window_close")
        
        # Let the parent class handle the event
        super().closeEvent(event)
