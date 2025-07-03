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

