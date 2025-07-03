/*
#================================================
# MODUL-INITIALISIERER: rApp Center
# FUNKTION: Bootloader für das rApp Center. Lädt Logik und Design.
#================================================
*/
(function() {
    const modulePath = 'modules/rapp-store/';
    const targetElement = document.getElementById('rapp-store-target'); // Benötigt eine "Steckdose" in der content/main.md

    if (!targetElement) return;
    targetElement.innerHTML = '<p>Lade rApp Center...</p>';

    // Lade CSS und JS des Moduls
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = modulePath + 'rapp-store.css';
    document.head.appendChild(cssLink);

    const script = document.createElement('script');
    script.src = modulePath + 'rapp-store.js';
    script.onload = () => {
        if (window.RFOF_MODULES && window.RFOF_MODULES.RappStore) {
            RFOF_APP.rAppStore = new window.RFOF_MODULES.RappStore(targetElement);
        }
    };
    document.body.appendChild(script);
})();
