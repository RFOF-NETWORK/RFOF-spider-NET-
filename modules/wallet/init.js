/*
#================================================
# MODUL-INITIALISIERER: Wallet rApp
# FUNKTION: Dient als "Bootloader" für das Wallet-Modul. Lädt alle
#           notwendigen Abhängigkeiten (JS, CSS) und startet die Anwendung.
# WIRD GELADEN VON: scripts.js (autonom)
#================================================
*/

// IIFE (Immediately Invoked Function Expression) zur Kapselung
(function() {
    const modulePath = 'modules/wallet/';
    const targetElement = document.getElementById('wallet-app-target');

    if (!targetElement) {
        console.error("[Wallet-Modul] Ziel-Container #wallet-app-target nicht gefunden.");
        return;
    }

    // Zeige einen Ladezustand im Ziel-Container an
    targetElement.innerHTML = '<p>Lade souveränes Wallet-Modul...</p>';

    // Lade das CSS für das Modul
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = modulePath + 'wallet.css';
    document.head.appendChild(cssLink);

    // Lade das JS-Skript für das Modul
    const script = document.createElement('script');
    script.src = modulePath + 'wallet.js';
    script.type = 'module';

    script.onload = () => {
        // Prüfe, ob die WalletApp-Klasse nach dem Laden des Skripts verfügbar ist
        if (window.RFOF_MODULES && window.RFOF_MODULES.WalletApp) {
            // Initialisiere die App und speichere die Instanz im globalen Namespace
            RFOF_APP.walletApp = new window.RFOF_MODULES.WalletApp(targetElement);
            console.log("[Wallet-Modul] Initialisierung erfolgreich.");
        } else {
            targetElement.innerHTML = `<p style="color:red;">Fehler beim Initialisieren der WalletApp-Klasse.</p>`;
        }
    };
    
    script.onerror = () => {
        targetElement.innerHTML = `<p style="color:red;">Fehler: Das Skript ${script.src} konnte nicht geladen werden.</p>`;
    };

    document.body.appendChild(script);

})();
