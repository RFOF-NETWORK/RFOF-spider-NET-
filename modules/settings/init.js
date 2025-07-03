/*
#================================================
# MODUL-INITIALISIERER: Einstellungen (Settings)
# FUNKTION: Dient als "Bootloader" für das Einstellungs-Modul.
# WIRD GELADEN VON: scripts.js (autonom)
#================================================
*/

(function() {
    const modulePath = 'modules/settings/';

    function loadScript(fileName) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = modulePath + fileName;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Skript konnte nicht geladen werden: ${fileName}`));
            document.body.appendChild(script);
        });
    }

    function loadCSS(fileName) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = modulePath + fileName;
        document.head.appendChild(link);
    }

    async function initializeSettingsModule() {
        const targetElement = document.getElementById('settings-module-target');
        if (!targetElement) {
            console.error("[Settings-Modul] Ziel-Container #settings-module-target nicht gefunden.");
            return;
        }

        try {
            loadCSS('settings.css');
            await loadScript('settings.js');

            if (window.RFOF_MODULES && window.RFOF_MODULES.SettingsApp) {
                RFOF_APP.settingsApp = new window.RFOF_MODULES.SettingsApp(targetElement);
                console.log("[Settings-Modul] Initialisierung erfolgreich.");
            } else {
                throw new Error("SettingsApp-Klasse wurde nicht im globalen Modul-Namespace gefunden.");
            }

        } catch (error) {
            console.error("[Settings-Modul] Fehler bei der Initialisierung:", error);
            targetElement.innerHTML = `<p style="color:red;">Fehler beim Laden des Einstellungs-Moduls.</p>`;
        }
    }

    initializeSettingsModule();

})();
