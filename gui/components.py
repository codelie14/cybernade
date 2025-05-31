"""
Reusable UI components for CYBERNADE application.
"""
import logging
import os
import json
from datetime import datetime
from PyQt5.QtWidgets import (
    QWidget, QVBoxLayout, QHBoxLayout, QTextEdit, QPushButton,
    QLabel, QLineEdit, QProgressBar, QComboBox, QFrame, QTableWidget,
    QTableWidgetItem, QHeaderView, QSizePolicy, QToolTip, QMessageBox,
    QFileDialog, QApplication, QSplitter, QRadioButton, QButtonGroup,
    QGroupBox, QScrollArea
)
from PyQt5.QtCore import Qt, QSize, QTimer, pyqtSignal, pyqtSlot
from PyQt5.QtGui import QTextCursor, QColor

from modules.osint import osint


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


class OSINTWidget(QWidget):
    """Widget for OSINT operations."""
    
    def __init__(self, parent=None):
        """Initialize the OSINT widget."""
        super().__init__(parent)
        
        # Set up layout
        self.main_layout = QVBoxLayout(self)
        
        # Create search section
        self._create_search_section()
        
        # Create results section
        self._create_results_section()
        
        # Create actions section
        self._create_actions_section()
        
        # Create history section
        self._create_history_section()
        
        # Current results
        self.current_results = None
    
    def _create_search_section(self):
        """Create the search section."""
        # Create group box
        search_group = QGroupBox("Search")
        self.main_layout.addWidget(search_group)
        
        # Create layout
        search_layout = QVBoxLayout(search_group)
        
        # Create input section
        input_layout = QHBoxLayout()
        
        # Add target label
        input_layout.addWidget(QLabel("Target:"))
        
        # Add target input
        self.target_input = QLineEdit()
        self.target_input.setPlaceholderText("Enter IP, domain or email")
        self.target_input.returnPressed.connect(self._search)
        input_layout.addWidget(self.target_input)
        
        # Add search button
        self.search_button = QPushButton("Search")
        self.search_button.clicked.connect(self._search)
        input_layout.addWidget(self.search_button)
        
        search_layout.addLayout(input_layout)
        
        # Add type label
        self.type_label = QLabel("Type detected: None")
        search_layout.addWidget(self.type_label)
        
        # Add status bar
        status_layout = QHBoxLayout()
        
        # Add status label
        self.status_label = QLabel("Ready")
        status_layout.addWidget(self.status_label)
        
        # Add progress bar
        self.progress_bar = QProgressBar()
        self.progress_bar.setRange(0, 100)
        self.progress_bar.setValue(0)
        self.progress_bar.setVisible(False)
        status_layout.addWidget(self.progress_bar)
        
        search_layout.addLayout(status_layout)
    
    def _create_results_section(self):
        """Create the results section."""
        # Create group box
        results_group = QGroupBox("Results")
        self.main_layout.addWidget(results_group)
        results_group.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        
        # Create layout
        results_layout = QVBoxLayout(results_group)
        
        # Create results display
        self.results_display = QTextEdit()
        self.results_display.setReadOnly(True)
        self.results_display.setLineWrapMode(QTextEdit.NoWrap)
        results_layout.addWidget(self.results_display)
    
    def _create_actions_section(self):
        """Create the actions section."""
        # Create layout
        actions_layout = QHBoxLayout()
        self.main_layout.addLayout(actions_layout)
        
        # Add export button
        self.export_button = QPushButton("Export Results")
        self.export_button.clicked.connect(self._export_results)
        self.export_button.setEnabled(False)
        actions_layout.addWidget(self.export_button)
        
        # Add clear button
        self.clear_button = QPushButton("Clear Results")
        self.clear_button.clicked.connect(self._clear_results)
        self.clear_button.setEnabled(False)
        actions_layout.addWidget(self.clear_button)
        
        # Add spacer
        actions_layout.addStretch()
        
        # Add new search button
        self.new_search_button = QPushButton("New Search")
        self.new_search_button.clicked.connect(self._new_search)
        actions_layout.addWidget(self.new_search_button)
    
    def _create_history_section(self):
        """Create the history section."""
        # Create group box
        history_group = QGroupBox("Search History")
        self.main_layout.addWidget(history_group)
        
        # Create layout
        history_layout = QVBoxLayout(history_group)
        
        # Create history table
        self.history_table = QTableWidget(0, 3)
        self.history_table.setHorizontalHeaderLabels(["Target", "Type", "Time"])
        self.history_table.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
        self.history_table.verticalHeader().setVisible(False)
        self.history_table.setSelectionBehavior(QTableWidget.SelectRows)
        self.history_table.setEditTriggers(QTableWidget.NoEditTriggers)
        self.history_table.doubleClicked.connect(self._load_history_item)
        history_layout.addWidget(self.history_table)
        
        # Create refresh button
        refresh_layout = QHBoxLayout()
        
        refresh_button = QPushButton("Refresh History")
        refresh_button.clicked.connect(self._refresh_history)
        refresh_layout.addWidget(refresh_button)
        
        refresh_layout.addStretch()
        
        history_layout.addLayout(refresh_layout)
        
        # Load history
        self._refresh_history()
    
    def _refresh_history(self):
        """Refresh the search history."""
        # Get history
        history = osint.get_history()
        
        # Clear table
        self.history_table.setRowCount(0)
        
        # Add items
        for item in history:
            row = self.history_table.rowCount()
            self.history_table.insertRow(row)
            
            # Add target
            self.history_table.setItem(row, 0, QTableWidgetItem(item["target"]))
            
            # Add type
            self.history_table.setItem(row, 1, QTableWidgetItem(item["target_type"]))
            
            # Add timestamp
            self.history_table.setItem(row, 2, QTableWidgetItem(item["timestamp"]))
    
    def _load_history_item(self, index):
        """Load a history item."""
        # Get target and type
        target = self.history_table.item(index.row(), 0).text()
        target_type = self.history_table.item(index.row(), 1).text()
        
        # Set target
        self.target_input.setText(target)
        
        # Update type label
        self.type_label.setText(f"Type detected: {target_type}")
        
        # Search
        self._search()
    
    def _search(self):
        """Perform a search."""
        # Get target
        target = self.target_input.text().strip()
        
        if not target:
            QMessageBox.warning(self, "Empty Input", "Please enter a target to search")
            return
        
        # Update status
        self.status_label.setText("Searching...")
        self.progress_bar.setVisible(True)
        self.progress_bar.setValue(0)
        
        # Disable search button
        self.search_button.setEnabled(False)
        
        # Start progress animation
        self._start_progress_animation()
        
        # Detect type
        target_type = osint.auto_detect_target_type(target)
        self.type_label.setText(f"Type detected: {target_type}")
        
        # Clear results
        self.results_display.clear()
        
        # Process the search in the main thread (for simplicity in the MVP)
        # In a more advanced version, we would use QThread to avoid freezing the UI
        try:
            # Search
            results = osint.search(target)
            
            # Save results
            self.current_results = results
            
            # Display results
            self._display_results(results)
            
            # Enable buttons
            self.export_button.setEnabled(True)
            self.clear_button.setEnabled(True)
            
            # Update status
            self.status_label.setText("Search completed")
        except Exception as e:
            # Display error
            self.results_display.setText(f"Error: {str(e)}")
            
            # Update status
            self.status_label.setText("Search failed")
            
            # Log error
            logging.error(f"Search error: {e}")
        
        # Stop progress animation
        self._stop_progress_animation()
        
        # Enable search button
        self.search_button.setEnabled(True)
        
        # Refresh history
        self._refresh_history()
    
    def _start_progress_animation(self):
        """Start progress animation."""
        self.progress_timer = QTimer(self)
        self.progress_timer.timeout.connect(self._update_progress)
        self.progress_timer.start(100)
    
    def _stop_progress_animation(self):
        """Stop progress animation."""
        if hasattr(self, 'progress_timer'):
            self.progress_timer.stop()
        
        self.progress_bar.setValue(100)
        self.progress_bar.setVisible(False)
    
    def _update_progress(self):
        """Update progress animation."""
        value = self.progress_bar.value()
        
        if value >= 100:
            value = 0
        else:
            value += 5
        
        self.progress_bar.setValue(value)
    
    def _display_results(self, results):
        """Display the search results.
        
        Args:
            results (dict): Search results
        """
        if not results:
            self.results_display.setText("No results")
            return
        
        # Set text color to default
        self.results_display.setTextColor(QColor(Qt.black))
        
        # Display results based on type
        target_type = results.get("type", "unknown")
        
        if "error" in results:
            self.results_display.setText(f"Error: {results['error']}")
            return
        
        if target_type == "ip":
            self._display_ip_results(results)
        elif target_type == "domain":
            self._display_domain_results(results)
        elif target_type == "email":
            self._display_email_results(results)
        else:
            self.results_display.setText(f"Unknown target type: {target_type}")
    
    def _display_ip_results(self, results):
        """Display IP search results.
        
        Args:
            results (dict): Search results
        """
        # Create formatted output
        output = f"IP: {results['target']}\n"
        output += f"Timestamp: {results['timestamp']}\n"
        output += f"Execution time: {results['execution_time']:.2f} seconds\n\n"
        
        # Add geolocation information
        geo = results.get("geolocation", {})
        output += "=== Geolocation Information ===\n"
        
        if "error" in geo:
            output += f"Error: {geo['error']}\n"
        else:
            output += f"City: {geo.get('city', 'N/A')}\n"
            output += f"Region: {geo.get('region', 'N/A')}\n"
            output += f"Country: {geo.get('country', 'N/A')}\n"
            output += f"Postal: {geo.get('postal', 'N/A')}\n"
            output += f"Latitude: {geo.get('latitude', 'N/A')}\n"
            output += f"Longitude: {geo.get('longitude', 'N/A')}\n"
            output += f"ASN: {geo.get('asn', 'N/A')}\n"
            output += f"Organization: {geo.get('org', 'N/A')}\n"
            output += f"Timezone: {geo.get('timezone', 'N/A')}\n"
        
        # Add Shodan information if available
        shodan = results.get("shodan", {})
        output += "\n=== Shodan Information ===\n"
        
        if "error" in shodan:
            output += f"Error: {shodan['error']}\n"
        else:
            output += f"Hostnames: {', '.join(shodan.get('hostnames', ['N/A']))}\n"
            output += f"Country: {shodan.get('country', 'N/A')}\n"
            output += f"City: {shodan.get('city', 'N/A')}\n"
            output += f"Organization: {shodan.get('org', 'N/A')}\n"
            output += f"ISP: {shodan.get('isp', 'N/A')}\n"
            output += f"ASN: {shodan.get('asn', 'N/A')}\n"
            output += f"Operating System: {shodan.get('os', 'N/A')}\n"
            output += f"Open Ports: {', '.join(map(str, shodan.get('ports', ['N/A'])))}\n"
            output += f"Vulnerabilities: {', '.join(shodan.get('vulns', ['None']))}\n"
            output += f"Last Update: {shodan.get('last_update', 'N/A')}\n"
            output += f"Tags: {', '.join(shodan.get('tags', ['None']))}\n"
        
        # Display
        self.results_display.setText(output)
    
    def _display_domain_results(self, results):
        """Display domain search results.
        
        Args:
            results (dict): Search results
        """
        # Create formatted output
        output = f"Domain: {results['target']}\n"
        output += f"Timestamp: {results['timestamp']}\n"
        output += f"Execution time: {results['execution_time']:.2f} seconds\n\n"
        
        # Add IP information
        output += f"IP: {results.get('ip', 'N/A')}\n\n"
        
        # Add WHOIS information
        whois_data = results.get("whois", {})
        output += "=== WHOIS Information ===\n"
        
        if "error" in whois_data:
            output += f"Error: {whois_data['error']}\n"
        else:
            output += f"Registrar: {whois_data.get('registrar', 'N/A')}\n"
            output += f"Creation Date: {whois_data.get('creation_date', 'N/A')}\n"
            output += f"Expiration Date: {whois_data.get('expiration_date', 'N/A')}\n"
            output += f"Updated Date: {whois_data.get('updated_date', 'N/A')}\n"
            output += f"Name Servers: {', '.join(whois_data.get('name_servers', ['N/A']))}\n"
            output += f"Status: {', '.join(whois_data.get('status', ['N/A']))}\n"
            output += f"DNSSEC: {whois_data.get('dnssec', 'N/A')}\n"
            
            # Add registrant information
            registrant = whois_data.get("registrant", {})
            output += "\nRegistrant Information:\n"
            output += f"  Name: {registrant.get('name', 'N/A')}\n"
            output += f"  Organization: {registrant.get('organization', 'N/A')}\n"
            output += f"  Country: {registrant.get('country', 'N/A')}\n"
        
        # Add DNS information
        dns_data = results.get("dns", {})
        output += "\n=== DNS Information ===\n"
        
        # A records
        a_records = dns_data.get("A", {})
        output += "A Records:\n"
        
        if "error" in a_records:
            output += f"  Error: {a_records['error']}\n"
        else:
            for record in a_records.get("records", []):
                output += f"  {record}\n"
        
        # AAAA records
        aaaa_records = dns_data.get("AAAA", {})
        output += "\nAAAA Records:\n"
        
        if "error" in aaaa_records:
            output += f"  Error: {aaaa_records['error']}\n"
        else:
            for record in aaaa_records.get("records", []):
                output += f"  {record}\n"
        
        # MX records
        mx_records = dns_data.get("MX", {})
        output += "\nMX Records:\n"
        
        if "error" in mx_records:
            output += f"  Error: {mx_records['error']}\n"
        else:
            for record in mx_records.get("records", []):
                if isinstance(record, dict):
                    output += f"  {record.get('preference')} {record.get('exchange')}\n"
                else:
                    output += f"  {record}\n"
        
        # NS records
        ns_records = dns_data.get("NS", {})
        output += "\nNS Records:\n"
        
        if "error" in ns_records:
            output += f"  Error: {ns_records['error']}\n"
        else:
            for record in ns_records.get("records", []):
                output += f"  {record}\n"
        
        # TXT records
        txt_records = dns_data.get("TXT", {})
        output += "\nTXT Records:\n"
        
        if "error" in txt_records:
            output += f"  Error: {txt_records['error']}\n"
        else:
            for record in txt_records.get("records", []):
                output += f"  {record}\n"
        
        # SOA records
        soa_records = dns_data.get("SOA", {})
        output += "\nSOA Records:\n"
        
        if "error" in soa_records:
            output += f"  Error: {soa_records['error']}\n"
        else:
            for record in soa_records.get("records", []):
                if isinstance(record, dict):
                    output += f"  MNAME: {record.get('mname')}\n"
                    output += f"  RNAME: {record.get('rname')}\n"
                    output += f"  Serial: {record.get('serial')}\n"
                    output += f"  Refresh: {record.get('refresh')}\n"
                    output += f"  Retry: {record.get('retry')}\n"
                    output += f"  Expire: {record.get('expire')}\n"
                    output += f"  Minimum: {record.get('minimum')}\n"
                else:
                    output += f"  {record}\n"
        
        # Add geolocation information if available
        geo = results.get("geolocation", {})
        if geo:
            output += "\n=== Geolocation Information ===\n"
            
            if "error" in geo:
                output += f"Error: {geo['error']}\n"
            else:
                output += f"City: {geo.get('city', 'N/A')}\n"
                output += f"Region: {geo.get('region', 'N/A')}\n"
                output += f"Country: {geo.get('country', 'N/A')}\n"
                output += f"Postal: {geo.get('postal', 'N/A')}\n"
                output += f"Latitude: {geo.get('latitude', 'N/A')}\n"
                output += f"Longitude: {geo.get('longitude', 'N/A')}\n"
                output += f"ASN: {geo.get('asn', 'N/A')}\n"
                output += f"Organization: {geo.get('org', 'N/A')}\n"
                output += f"Timezone: {geo.get('timezone', 'N/A')}\n"
        
        # Display
        self.results_display.setText(output)
    
    def _display_email_results(self, results):
        """Display email search results.
        
        Args:
            results (dict): Search results
        """
        # Create formatted output
        output = f"Email: {results['target']}\n"
        output += f"Timestamp: {results['timestamp']}\n"
        output += f"Execution time: {results['execution_time']:.2f} seconds\n\n"
        
        # Add verification information
        verification = results.get("verification", {})
        output += "=== Email Verification ===\n"
        
        if verification:
            output += f"Format Valid: {verification.get('format_valid', False)}\n"
            output += f"Domain Exists: {verification.get('domain_exists', False)}\n"
            output += f"Has MX Records: {verification.get('has_mx_records', False)}\n"
        else:
            output += "No verification data available\n"
        
        # Add domain information
        domain_info = results.get("domain_info", {})
        if domain_info:
            output += "\n=== Domain Information ===\n"
            output += f"Domain: {domain_info.get('target', 'N/A')}\n"
            
            # Add WHOIS information
            whois_data = domain_info.get("whois", {})
            output += "\nWHOIS Information:\n"
            
            if "error" in whois_data:
                output += f"Error: {whois_data['error']}\n"
            else:
                output += f"  Registrar: {whois_data.get('registrar', 'N/A')}\n"
                output += f"  Creation Date: {whois_data.get('creation_date', 'N/A')}\n"
                output += f"  Expiration Date: {whois_data.get('expiration_date', 'N/A')}\n"
                output += f"  Updated Date: {whois_data.get('updated_date', 'N/A')}\n"
            
            # Add DNS information (MX records only)
            dns_data = domain_info.get("dns", {})
            if dns_data:
                mx_records = dns_data.get("MX", {})
                output += "\nMX Records:\n"
                
                if "error" in mx_records:
                    output += f"  Error: {mx_records['error']}\n"
                else:
                    for record in mx_records.get("records", []):
                        if isinstance(record, dict):
                            output += f"  {record.get('preference')} {record.get('exchange')}\n"
                        else:
                            output += f"  {record}\n"
        
        # Display
        self.results_display.setText(output)
    
    def _export_results(self):
        """Export the search results."""
        if not self.current_results:
            QMessageBox.warning(self, "No Results", "No results to export")
            return
        
        # Get file path
        file_path, _ = QFileDialog.getSaveFileName(
            self,
            "Export Results",
            f"exports/osint/{self.current_results.get('target', 'results')}.txt",
            "Text Files (*.txt)"
        )
        
        if not file_path:
            return
        
        # Export results
        path = osint.export_results(self.current_results, file_path)
        
        if path:
            QMessageBox.information(
                self,
                "Export Successful",
                f"Results exported to {path}"
            )
        else:
            QMessageBox.critical(
                self,
                "Export Failed",
                "Failed to export results"
            )
    
    def _clear_results(self):
        """Clear the search results."""
        self.results_display.clear()
        self.current_results = None
        self.export_button.setEnabled(False)
        self.clear_button.setEnabled(False)
    
    def _new_search(self):
        """Start a new search."""
        self.target_input.clear()
        self.type_label.setText("Type detected: None")
        self._clear_results()
        self.target_input.setFocus()