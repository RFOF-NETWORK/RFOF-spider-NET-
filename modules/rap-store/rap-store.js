/*
#================================================
# MODUL-LOGIK: rApp Center
# FUNKTION: Baut das App-Grid, verwaltet das Overlay ("Website-in-Website")
#           und lädt die rApps in eine sichere Umgebung.
#================================================
*/
window.RFOF_MODULES = window.RFOF_MODULES || {};

window.RFOF_MODULES.RappStore = class RappStore {
    constructor(target) {
        this.container = target;
        this.rApps = [
            { name: "Bubatz-Manager", icon: "https://raw.githubusercontent.com/RFOF-NETWORK/RFOF-NETWORK/main/assets/rotating_cyber_brain.svg", url: "URL_ZUM_BUBATZ_MANAGER_BOT" },
            { name: "PZQQET-Chess", icon: "https://raw.githubusercontent.com/RFOF-NETWORK/RFOF-NETWORK/main/assets/rotating_cyber_brain.svg", url: "URL_ZUM_CHESS_GAME" },
            // Weitere rApps können hier einfach hinzugefügt werden
        ];
        this.init();
    }

    init() { this.renderGrid(); }

    renderGrid() {
        let gridHtml = '<div class="rapp-grid">';
        this.rApps.forEach(app => {
            gridHtml += `
                <div class="rapp-item" data-url="${app.url}">
                    <img src="${app.icon}" alt="${app.name} Icon">
                    <p>${app.name}</p>
                </div>`;
        });
        gridHtml += '</div>';
        this.container.innerHTML = gridHtml;
        this.addEventListeners();
    }

    launchRapp(url) {
        const overlay = document.createElement('div');
        overlay.className = 'rapp-overlay';
        overlay.innerHTML = `
            <div class="rapp-window">
                <button class="rapp-close-btn" title="Schließen">&times;</button>
                <iframe class="rapp-iframe" src="${url}" sandbox="allow-scripts allow-same-origin"></iframe>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.querySelector('.rapp-close-btn').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
    }

    addEventListeners() {
        this.container.querySelectorAll('.rapp-item').forEach(item => {
            item.addEventListener('click', () => {
                this.launchRapp(item.dataset.url);
            });
        });
    }
};
