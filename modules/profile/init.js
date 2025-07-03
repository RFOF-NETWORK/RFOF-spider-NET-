#================================================
# MODUL-INITIALISIERER: Wallet rApp
# FUNKTION: Dient als "Bootloader" für das Wallet-Modul. Lädt alle
#           notwendigen Abhängigkeiten (JS, CSS) und startet die Anwendung.
# WIRD GELADEN VON: scripts.js (autonom)
#================================================

// IIFE (Immediately Invoked Function Expression) zur Kapselung und Vermeidung globaler Konflikte
(function() {
    // Definierter Pfad zum Modul-Verzeichnis
    const modulePath = 'modules/wallet/';

    /**
     * Lädt eine JavaScript-Datei und gibt ein Promise zurück.
     * @param {string} fileName - Der Name der JS-Datei.
     * @returns {Promise<void>}
     */
    function loadScript(fileName) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = modulePath + fileName;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Skript konnte nicht geladen werden: ${fileName}`));
            document.body.appendChild(script);
        });
    }

    /**
     * Lädt eine CSS-Datei.
     * @param {string} fileName - Der Name der CSS-Datei.
     */
    function loadCSS(fileName) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = modulePath + fileName;
        document.head.appendChild(link);
    }

    /**
     * Die Haupt-Initialisierungsfunktion für das Wallet-Modul.
     */
    async function initializeWalletModule() {
        const targetElement = document.getElementById('wallet-app-target');
        if (!targetElement) {
            console.error("[Wallet-Modul] Ziel-Container #wallet-app-target nicht gefunden.");
            return;
        }

        // Zeige einen Ladezustand im Ziel-Container an
        targetElement.innerHTML = '<p>Lade Wallet-Modul...</p>';

        try {
            // Lade CSS und JS parallel für maximale Geschwindigkeit
            loadCSS('wallet.css');
            await loadScript('wallet.js');

            // Prüfe, ob die WalletApp-Klasse nach dem Laden des Skripts verfügbar ist
            if (window.RFOF_MODULES && window.RFOF_MODULES.WalletApp) {
                // Initialisiere die App und speichere die Instanz im globalen Namespace
                RFOF_APP.walletApp = new window.RFOF_MODULES.WalletApp(targetElement);
                console.log("[Wallet-Modul] Initialisierung erfolgreich.");
            } else {
                throw new Error("WalletApp-Klasse wurde nicht im globalen Modul-Namespace gefunden.");
            }

        } catch (error) {
            console.error("[Wallet-Modul] Fehler bei der Initialisierung:", error);
            targetElement.innerHTML = `<p style="color:red;">Fehler beim Starten der Wallet-rApp.</p>`;
        }
    }

    // Starte den Prozess
    initializeWalletModule();

})();
