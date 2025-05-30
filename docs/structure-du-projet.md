# STRUCTURE DU PROJET CYBERNADE
## Architecture Détaillée et Organisation des Fichiers

---

## 📁 STRUCTURE GÉNÉRALE

```
CYBERNADE/
├── 📁 src/                          # Code source principal
│   ├── 📁 core/                     # Noyau de l'application
│   ├── 📁 modules/                  # Modules fonctionnels
│   ├── 📁 gui/                      # Interface graphique
│   ├── 📁 utils/                    # Utilitaires et helpers
│   ├── 📁 api/                      # Clients API externes
│   └── 📄 main.py                   # Point d'entrée principal
├── 📁 data/                         # Données statiques
├── 📁 config/                       # Fichiers de configuration
├── 📁 tests/                        # Tests unitaires et d'intégration
├── 📁 docs/                         # Documentation
├── 📁 scripts/                      # Scripts utilitaires
├── 📁 assets/                       # Ressources (images, icônes, etc.)
├── 📁 plugins/                      # Plugins et extensions
├── 📁 exports/                      # Exports et rapports générés
├── 📁 logs/                         # Fichiers de logs
├── 📁 database/                     # Base de données locale
├── 📁 build/                        # Fichiers de build
├── 📁 dist/                         # Distribution et packaging
├── 📄 requirements.txt              # Dépendances Python
├── 📄 requirements-dev.txt          # Dépendances de développement
├── 📄 setup.py                      # Configuration d'installation
├── 📄 pyproject.toml               # Configuration moderne Python
├── 📄 README.md                     # Documentation principale
├── 📄 CHANGELOG.md                  # Historique des versions
├── 📄 LICENSE                       # Licence du projet
├── 📄 .gitignore                    # Fichiers ignorés par Git
├── 📄 .env.example                  # Variables d'environnement exemple
└── 📄 Makefile                      # Commandes de build et test
```

---

## 🔧 STRUCTURE DÉTAILLÉE - /src/

### 📁 /src/core/ - Noyau de l'Application

```
core/
├── 📄 __init__.py                   # Initialisation du package
├── 📄 app.py                        # Application principale
├── 📄 config.py                     # Gestionnaire de configuration
├── 📄 database.py                   # Gestionnaire de base de données
├── 📄 plugin_manager.py             # Gestionnaire de plugins
├── 📄 event_manager.py              # Système d'événements
├── 📄 logger.py                     # Système de logging centralisé
├── 📄 exceptions.py                 # Exceptions personnalisées
├── 📄 decorators.py                 # Décorateurs utilitaires
├── 📄 constants.py                  # Constantes globales
├── 📄 security.py                   # Fonctions de sécurité
└── 📄 updater.py                    # Système de mise à jour
```

**Détails des fichiers core :**

#### 📄 app.py
```python
"""
Application principale CYBERNADE
- Initialisation de l'application
- Gestion du cycle de vie
- Coordination des modules
- Interface avec le système
"""

class CybernadeApp:
    def __init__(self):
        self.config = ConfigManager()
        self.db = DatabaseManager()
        self.plugin_manager = PluginManager()
        self.logger = Logger()
        
    def initialize(self):
        """Initialisation complète de l'application"""
        
    def run(self):
        """Lancement de l'application"""
        
    def shutdown(self):
        """Arrêt propre de l'application"""
```

#### 📄 config.py
```python
"""
Gestionnaire de configuration centralisé
- Chargement des configurations
- Validation des paramètres
- Sauvegarde automatique
- Configuration par défaut
"""

class ConfigManager:
    def load_config(self, config_path: str):
        """Charge la configuration depuis un fichier"""
        
    def get(self, key: str, default=None):
        """Récupère une valeur de configuration"""
        
    def set(self, key: str, value):
        """Définit une valeur de configuration"""
```

---

### 📁 /src/modules/ - Modules Fonctionnels

```
modules/
├── 📄 __init__.py                   # Initialisation des modules
├── 📁 osint/                        # Module OSINT
│   ├── 📄 __init__.py
│   ├── 📄 osint_manager.py          # Gestionnaire OSINT principal
│   ├── 📄 ip_research.py            # Recherche IP
│   ├── 📄 domain_research.py        # Recherche domaine
│   ├── 📄 email_research.py         # Recherche email
│   ├── 📄 social_media.py           # Réseaux sociaux
│   ├── 📄 metadata_extractor.py     # Extracteur de métadonnées
│   └── 📄 report_generator.py       # Générateur de rapports
├── 📁 network/                      # Module Réseau
│   ├── 📄 __init__.py
│   ├── 📄 network_manager.py        # Gestionnaire réseau principal
│   ├── 📄 port_scanner.py           # Scanner de ports
│   ├── 📄 service_detector.py       # Détecteur de services
│   ├── 📄 vulnerability_scanner.py  # Scanner de vulnérabilités
│   ├── 📄 packet_analyzer.py        # Analyseur de paquets
│   ├── 📄 wifi_tools.py             # Outils Wi-Fi
│   └── 📄 network_mapper.py         # Cartographie réseau
├── 📁 crypto/                       # Module Cryptographie
│   ├── 📄 __init__.py
│   ├── 📄 crypto_manager.py         # Gestionnaire crypto principal
│   ├── 📄 hash_tools.py             # Outils de hashage
│   ├── 📄 encryption.py             # Chiffrement/déchiffrement
│   ├── 📄 password_tools.py         # Outils de mots de passe
│   ├── 📄 steganography.py          # Stéganographie
│   └── 📄 key_manager.py            # Gestion des clés
├── 📁 forensic/                     # Module Forensic
│   ├── 📄 __init__.py
│   ├── 📄 forensic_manager.py       # Gestionnaire forensic principal
│   ├── 📄 file_analyzer.py          # Analyseur de fichiers
│   ├── 📄 malware_detector.py       # Détecteur de malware
│   ├── 📄 system_analyzer.py        # Analyseur système
│   ├── 📄 log_analyzer.py           # Analyseur de logs
│   └── 📄 recovery_tools.py         # Outils de récupération
├── 📁 pentest/                      # Module Pentesting
│   ├── 📄 __init__.py
│   ├── 📄 pentest_manager.py        # Gestionnaire pentest principal
│   ├── 📄 brute_force.py            # Outils brute force
│   ├── 📄 exploit_manager.py        # Gestionnaire d'exploits
│   ├── 📄 payload_generator.py      # Générateur de payloads
│   ├── 📄 session_manager.py        # Gestionnaire de sessions
│   └── 📄 automation.py             # Outils d'automatisation
└── 📁 defensive/                    # Module Défensif
    ├── 📄 __init__.py
    ├── 📄 defensive_manager.py      # Gestionnaire défensif principal
    ├── 📄 intrusion_detection.py   # Détection d'intrusion
    ├── 📄 log_monitor.py            # Surveillance des logs
    ├── 📄 threat_intel.py           # Intelligence des menaces
    └── 📄 incident_response.py      # Réponse aux incidents
```

**Exemple de structure d'un module :**

#### 📄 modules/osint/osint_manager.py
```python
"""
Gestionnaire principal du module OSINT
- Coordination des sous-modules
- Interface avec l'application principale
- Gestion des configurations spécifiques
"""

class OSINTManager:
    def __init__(self):
        self.ip_research = IPResearch()
        self.domain_research = DomainResearch()
        self.email_research = EmailResearch()
        
    def search(self, target: str, search_type: str = "auto"):
        """Recherche automatique avec détection de type"""
        
    def get_available_sources(self):
        """Retourne les sources disponibles"""
        
    def generate_report(self, search_results):
        """Génère un rapport des résultats"""
```

---

### 📁 /src/gui/ - Interface Graphique

```
gui/
├── 📄 __init__.py                   # Initialisation GUI
├── 📄 main_window.py                # Fenêtre principale
├── 📄 splash_screen.py              # Écran de démarrage
├── 📄 about_dialog.py               # Dialog À propos
├── 📄 settings_dialog.py            # Dialog de paramètres
├── 📁 components/                   # Composants réutilisables
│   ├── 📄 __init__.py
│   ├── 📄 custom_widgets.py         # Widgets personnalisés
│   ├── 📄 data_table.py             # Tableaux de données
│   ├── 📄 progress_bar.py           # Barres de progression
│   ├── 📄 notification_system.py   # Système de notifications
│   ├── 📄 input_validators.py       # Validateurs d'entrée
│   └── 📄 chart_widgets.py          # Widgets graphiques
├── 📁 modules/                      # Interfaces des modules
│   ├── 📄 __init__.py
│   ├── 📄 osint_ui.py               # Interface OSINT
│   ├── 📄 network_ui.py             # Interface Network
│   ├── 📄 crypto_ui.py              # Interface Crypto
│   ├── 📄 forensic_ui.py            # Interface Forensic
│   ├── 📄 pentest_ui.py             # Interface Pentest
│   └── 📄 defensive_ui.py           # Interface Défensive
├── 📁 themes/                       # Thèmes et styles
│   ├── 📄 __init__.py
│   ├── 📄 theme_manager.py          # Gestionnaire de thèmes
│   ├── 📄 dark_theme.py             # Thème sombre
│   ├── 📄 light_theme.py            # Thème clair
│   └── 📄 custom_styles.qss         # Styles CSS Qt
├── 📁 resources/                    # Ressources UI
│   ├── 📄 __init__.py
│   ├── 📄 icons.py                  # Gestionnaire d'icônes
│   ├── 📄 images.py                 # Gestionnaire d'images
│   └── 📄 fonts.py                  # Gestionnaire de polices
└── 📁 dialogs/                      # Boîtes de dialogue
    ├── 📄 __init__.py
    ├── 📄 export_dialog.py          # Dialog d'export
    ├── 📄 import_dialog.py          # Dialog d'import
    ├── 📄 api_config_dialog.py      # Configuration API
    └── 📄 error_dialog.py           # Dialog d'erreur
```

**Exemple d'interface de module :**

#### 📄 gui/modules/osint_ui.py
```python
"""
Interface utilisateur pour le module OSINT
- Formulaires de recherche
- Affichage des résultats
- Options d'export
"""

class OSINTWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.osint_manager = OSINTManager()
        self.setup_ui()
        
    def setup_ui(self):
        """Configuration de l'interface utilisateur"""
        
    def on_search_clicked(self):
        """Gestionnaire de clic sur recherche"""
        
    def display_results(self, results):
        """Affichage des résultats de recherche"""
```

---

### 📁 /src/utils/ - Utilitaires

```
utils/
├── 📄 __init__.py                   # Initialisation utils
├── 📄 helpers.py                    # Fonctions d'aide générales
├── 📄 validators.py                 # Validateurs de données
├── 📄 converters.py                 # Convertisseurs de format
├── 📄 file_utils.py                 # Utilitaires de fichiers
├── 📄 network_utils.py              # Utilitaires réseau
├── 📄 crypto_utils.py               # Utilitaires cryptographiques
├── 📄 text_utils.py                 # Utilitaires de texte
├── 📄 date_utils.py                 # Utilitaires de date
├── 📄 system_utils.py               # Utilitaires système
├── 📄 export_utils.py               # Utilitaires d'export
└── 📄 import_utils.py               # Utilitaires d'import
```

### 📁 /src/api/ - Clients API

```
api/
├── 📄 __init__.py                   # Initialisation API
├── 📄 base_client.py                # Client API de base
├── 📄 shodan_client.py              # Client Shodan
├── 📄 virustotal_client.py          # Client VirusTotal
├── 📄 censys_client.py              # Client Censys
├── 📄 hunter_client.py              # Client Hunter.io
├── 📄 hibp_client.py                # Client HaveIBeenPwned
├── 📄 nvd_client.py                 # Client NVD (CVE)
├── 📄 whois_client.py               # Client WHOIS
├── 📄 geo_client.py                 # Client géolocalisation
└── 📄 rate_limiter.py               # Gestionnaire de limite de taux
```

---

## 📊 STRUCTURE DÉTAILLÉE - /data/

```
data/
├── 📁 wordlists/                    # Listes de mots
│   ├── 📄 common_passwords.txt      # Mots de passe communs
│   ├── 📄 common_usernames.txt      # Noms d'utilisateur communs
│   ├── 📄 subdomain_list.txt        # Liste de sous-domaines
│   ├── 📄 ports_list.txt            # Liste de ports communs
│   └── 📄 file_extensions.txt       # Extensions de fichiers
├── 📁 signatures/                   # Signatures de détection
│   ├── 📄 malware_signatures.json   # Signatures malware
│   ├── 📄 yara_rules.yar            # Règles YARA
│   └── 📄 network_signatures.json   # Signatures réseau
├── 📁 templates/                    # Modèles de rapports
│   ├── 📄 osint_report.html         # Modèle rapport OSINT
│   ├── 📄 pentest_report.html       # Modèle rapport pentest
│   └── 📄 vulnerability_report.html # Modèle rapport vulnérabilités
├── 📁 databases/                    # Bases de données locales
│   ├── 📄 cve_database.db           # Base CVE locale
│   ├── 📄 port_services.db          # Base services/ports
│   └── 📄 threat_intel.db           # Intelligence des menaces
└── 📁 configs/                      # Configurations par défaut
    ├── 📄 default_config.json       # Configuration par défaut
    ├── 📄 api_endpoints.json        # Points d'API
    └── 📄 module_settings.json      # Paramètres des modules
```

---

## ⚙️ STRUCTURE DÉTAILLÉE - /config/

```
config/
├── 📄 app_config.json               # Configuration principale
├── 📄 api_keys.json                 # Clés API (à ne pas commiter)
├── 📄 database_config.json          # Configuration BDD
├── 📄 logging_config.json           # Configuration logging
├── 📄 module_configs/               # Configurations par module
│   ├── 📄 osint_config.json
│   ├── 📄 network_config.json
│   ├── 📄 crypto_config.json
│   ├── 📄 forensic_config.json
│   ├── 📄 pentest_config.json
│   └── 📄 defensive_config.json
└── 📄 user_preferences.json         # Préférences utilisateur
```

**Exemple de configuration :**

#### 📄 config/app_config.json
```json
{
  "app": {
    "name": "CYBERNADE",
    "version": "1.0.0",
    "debug": false,
    "auto_update": true,
    "theme": "dark",
    "language": "en"
  },
  "database": {
    "type": "sqlite",
    "path": "database/cybernade.db",
    "backup_interval": 24
  },
  "logging": {
    "level": "INFO",
    "max_size": "10MB",
    "backup_count": 5,
    "console_output": true
  },
  "security": {
    "encrypt_config": true,
    "session_timeout": 3600,
    "max_login_attempts": 3
  }
}
```

---

## 🧪 STRUCTURE DÉTAILLÉE - /tests/

```
tests/
├── 📄 __init__.py                   # Initialisation tests
├── 📄 conftest.py                   # Configuration pytest
├── 📄 test_config.py                # Tests de configuration
├── 📁 unit/                         # Tests unitaires
│   ├── 📄 __init__.py
│   ├── 📁 core/                     # Tests du core
│   │   ├── 📄 test_app.py
│   │   ├── 📄 test_config.py
│   │   ├── 📄 test_database.py
│   │   └── 📄 test_plugin_manager.py
│   ├── 📁 modules/                  # Tests des modules
│   │   ├── 📄 test_osint.py
│   │   ├── 📄 test_network.py
│   │   ├── 📄 test_crypto.py
│   │   ├── 📄 test_forensic.py
│   │   └── 📄 test_pentest.py
│   ├── 📁 gui/                      # Tests interface
│   │   ├── 📄 test_main_window.py
│   │   └── 📄 test_components.py
│   └── 📁 utils/                    # Tests utilitaires
│       ├── 📄 test_helpers.py
│       └── 📄 test_validators.py
├── 📁 integration/                  # Tests d'intégration
│   ├── 📄 __init__.py
│   ├── 📄 test_api_integration.py   # Tests API externes
│   ├── 📄 test_database_integration.py
│   └── 📄 test_module_integration.py
├── 📁 e2e/                          # Tests end-to-end
│   ├── 📄 __init__.py
│   ├── 📄 test_full_workflow.py     # Tests de workflow complets
│   └── 📄 test_gui_scenarios.py     # Tests scénarios GUI
├── 📁 performance/                  # Tests de performance
│   ├── 📄 __init__.py
│   ├── 📄 test_load.py              # Tests de charge
│   └── 📄 test_memory.py            # Tests mémoire
├── 📁