#================================================
# KANONISCHER CODE: Autonomer Modul-Lader (Zenith OS v1.0)
# FUNKTION: Erkennt und initialisiert alle Module innerhalb eines definierten Bereichs.
#           Dies ist das Herzstück der "5 Code Regel".
# STATUS: Final, als universelle Vorlage für alle Säulen.
#================================================

// Globale App-Kapselung
const RFOF_APP = {};

document.addEventListener('DOMContentLoaded', () => {

    // #--- MODUL: MenuController (Kanonischer Standard) ---#
    // Diese Logik verbleibt hier, da sie eine globale Funktion für den Header ist.
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navLinks');
    if (hamburger && navList) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navList.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        document.addEventListener('click', (event) => {
            if (navList.classList.contains('active')) {
                if (!navList.contains(event.target) && !hamburger.contains(event.target)) {
                    navList.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    }

    // #================================================
    // # KERN-ORCHESTRATOR: Die Modul-Entdeckungs-Engine
    // #================================================
    class ModuleLoader {
        constructor(appContainerId) {
            this.appContainer = document.getElementById(appContainerId);
            if (!this.appContainer) {
                console.error(`[PRAI-OS] Kritischer Fehler: App-Container mit der ID #${appContainerId} nicht gefunden.`);
                return;
            }
            this.discoverAndLoadModules();
        }

        /**
         * Scannt den App-Container nach Modul-Zielen und lädt die entsprechenden
         * Initialisierungs-Skripte aus dem /modules/ Verzeichnis.
         */
        discoverAndLoadModules() {
            const moduleTargets = this.appContainer.querySelectorAll('[id$="-module-target"]');
            
            console.log(`[PRAI-OS] ${moduleTargets.length} Modul-Ziel(e) entdeckt. Initialisiere Ladevorgang...`);

            moduleTargets.forEach(target => {
                const moduleId = target.id;
                // Extrahiert den Modulnamen (z.B. "wallet" aus "wallet-module-target")
                const moduleName = moduleId.replace('-module-target', '');
                
                this.loadModule(moduleName, target);
            });
        }

        /**
         * Lädt das Initialisierungs-Skript für ein einzelnes Modul.
         * Jedes Modul muss eine /modules/[modulname]/init.js Datei besitzen.
         */
        loadModule(moduleName, target) {
            const scriptPath = `modules/${moduleName}/init.js`;
            const script = document.createElement('script');
            script.src = scriptPath;
            script.type = 'module'; // Wichtig für moderne, gekapselte Skripte

            script.onload = () => {
                console.log(`[PRAI-OS] Modul '${moduleName}' erfolgreich geladen.`);
                // Wir gehen davon aus, dass das init.js Skript das Modul selbst initialisiert.
            };
            
            script.onerror = () => {
                console.error(`[PRAI-OS] FEHLER: Initialisierungs-Skript für Modul '${moduleName}' unter ${scriptPath} konnte nicht geladen werden.`);
                target.innerHTML = `<p style="color:red;">Fehler beim Laden des ${moduleName}-Moduls.</p>`;
            };

            document.body.appendChild(script);
        }
    }

    // #--- INITIALISIERUNG DES BETRIEBSSYSTEMS ---#
    // Starte den Modul-Lader für den Haupt-App-Bereich
    new ModuleLoader('wallet-app-target');
    
    // Mache die globale App-Variable verfügbar
    window.RFOF_APP = RFOF_APP;
});

//================================================
// # KANONISCHER CODE: WalletApp (Zenith-Version)
// # FUNKTION: Steuert die universelle Wallet-Verbindung, das Dashboard
// #           und die Vorstufen zum rApp Center.
// #================================================

class WalletApp {
    constructor(target) {
        this.container = target;
        this.wallet = null; // Hält den Zustand der verbundenen Wallet
        this.seedPhraseVisible = false;
        // Simuliert die TON Connect Bibliothek
        this.tonConnector = {
            connect: async () => {
                alert("TON Connect: Bitte scannen Sie den QR-Code oder bestätigen Sie in Ihrer Wallet (Telegram/Tonkeeper).");
                // Simuliert eine erfolgreiche Verbindung nach 2 Sekunden
                return new Promise(resolve => setTimeout(() => resolve({
                    address: '0xTON...' + Math.random().toString(16).substring(2, 8),
                    network: 'TON'
                }), 2000));
            }
        };
        this.init();
    }

    init() {
        this.render();
    }

    // #--- Der zentrale Verbindungs-Router ---#
    async connect(walletType) {
        this.container.innerHTML = `<p>Stelle Verbindung mit ${walletType} her...</p>`;
        try {
            let connectionData;
            switch(walletType) {
                case 'RFOF Wallet':
                    connectionData = await this.connectNativeRFOF();
                    break;
                case 'Telegram Wallet':
                case 'Tonkeeper':
                    connectionData = await this.connectTON();
                    break;
                case 'Binance Wallet':
                    connectionData = await this.connectEVM();
                    break;
                default:
                    throw new Error("Unbekannter Wallet-Typ.");
            }
            this.onConnectSuccess(walletType, connectionData.address);
        } catch (error) {
            this.container.innerHTML = `<p style="color:red;">Verbindung fehlgeschlagen: ${error.message}</p>`;
            setTimeout(() => this.render(), 3000);
        }
    }
    
    // #--- Spezifische Verbindungs-Methoden ---#

    // Methode für die native RFOF-Wallet via PWH-2025
    async connectNativeRFOF() {
        // Simuliert einen sicheren Handshake mit dem Hallo @RFOF-NETWORK Programm
        console.log("PWH-2025 Handshake initiiert...");
        await new Promise(resolve => setTimeout(resolve, 500));
        return { address: '0xSatoramy...' + Math.random().toString(16).substring(2, 10) };
    }

    // Methode für TON-basierte Wallets
    async connectTON() {
        // Nutzt den simulierten TON Connector
        const result = await this.tonConnector.connect();
        return result;
    }

    // Methode für EVM-basierte Wallets wie Binance Wallet
    async connectEVM() {
        // Prüft, ob die Binance Wallet Extension vorhanden ist
        if (typeof window.BinanceChain === 'undefined') {
            throw new Error("Binance Wallet nicht gefunden. Bitte installieren Sie die Browser-Extension.");
        }
        // Simuliert die Anfrage an die Extension
        console.log("Fordere Account-Zugriff von Binance Wallet an...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { address: '0xBsc...' + Math.random().toString(16).substring(2, 8) };
    }

    // #--- Erfolgs-Handler und UI-Rendering ---#
    onConnectSuccess(walletType, address) {
        this.wallet = {
            type: walletType,
            address: address,
            balances: { ctc: 420.69, axf: 1337000, majorana: 42 },
            seedPhrase: "PZQQET Logik Zukunft RFOF Satoria Anti-Virus Seele Majorana Sieg Öko Fusion Wille"
        };
        this.render();
    }

    render() {
        this.container.innerHTML = this.wallet ? this.renderDashboard() : this.renderConnector();
        this.addEventListeners();
    }

    renderConnector() {
        return `
            <div class="wallet-connector">
                <p>Verbinden Sie Ihre Wallet, um auf das RFOF-Ökosystem zuzugreifen.</p>
                <button class="primary" onclick="RFOF_APP.walletApp.connect('RFOF Wallet')">Mit RFOF Wallet verbinden</button>
                <button onclick="RFOF_APP.walletApp.connect('Telegram Wallet')">Mit Telegram Wallet</button>
                <button onclick="RFOF_APP.walletApp.connect('Tonkeeper')">Mit Tonkeeper</button>
                <button onclick="RFOF_APP.walletApp.connect('Binance Wallet')">Mit Binance Wallet</button>
            </div>`;
    }

    renderDashboard() {
        // Der Rest Ihrer Dashboard-, Staking-, Chart- und rApp-Hub-Logik bleibt hier erhalten
        return `
            <div class="wallet-dashboard">
                <h3>Willkommen, <span class="hash-link" title="Verbundene Wallet: ${this.wallet.type}">${this.wallet.address}</span></h3>
                <div class="balances">
                    </div>
                <div class="wallet-actions">
                    <h3>Aktionen</h3>
                    <div class="action-grid">
                        <button>Kreieren</button>
                        <button>Minten</button>
                        <button>Burnen</button>
                        <button>Minen</button>
                        <button id="staking-btn">Staken</button>
                        <button id="seed-phrase-btn">Seed Phrase</button>
                    </div>
                    <div id="seed-phrase-container"></div>
                </div>
                <div class="charts-container"><h3>Charts</h3><p>(...)</p></div>
                <div class="rapp-store-placeholder"><h3>RFOF rApp Center</h3><p>(...)</p></div>
            </div>`;
    }
    
    toggleSeedPhrase() { /* ... unverändert ... */ }
    addEventListeners() { /* ... unverändert ... */ }
}
// AB HIER WEITERE ERWEITERTE LOGIK ZU WalletApp HINZUFÜGEN
