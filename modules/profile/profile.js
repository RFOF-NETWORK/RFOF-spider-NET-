/*
#================================================
# MODUL-LOGIK: Souveränes Benutzerprofil
# FUNKTION: Steuert die Anzeige und Bearbeitung der Benutzeridentität.
#           Kommuniziert mit dem @RFOF-NETWORK Backend zur Datenspeicherung.
# WIRD GELADEN VON: /modules/profile/init.js
#================================================
*/

// Kapselung des Moduls in einem globalen Namespace, um Konflikte zu vermeiden
window.RFOF_MODULES = window.RFOF_MODULES || {};

window.RFOF_MODULES.ProfileApp = class ProfileApp {
    constructor(targetElement, walletInstance) {
        this.container = targetElement;
        this.wallet = walletInstance; // Nimmt die verbundene Wallet-Instanz entgegen
        this.userProfile = null; // Hält die Profildaten { username, email, pfp, showEmail }
        this.isEditingUsername = false;

        this.init();
    }

    async init() {
        console.log("[Profil-Modul] Initialisiere mit Wallet-Adresse:", this.wallet.address);
        await this.fetchProfileData();
        this.render();
    }

    /**
     * Simuliert das Abrufen von Profildaten vom Backend.
     * In einer echten Anwendung würde hier ein fetch-Aufruf an die @RFOF-NETWORK API stehen.
     */
    async fetchProfileData() {
        console.log("[Profil-Modul] Rufe Profildaten vom Backend ab...");
        // Simulierter API-Call
        await new Promise(resolve => setTimeout(resolve, 250)); 
        
        // Simulierter Response vom Backend
        this.userProfile = {
            username: "Satoramy_42",
            email: "rfof236286@gmail.com",
            pfp: "https://raw.githubusercontent.com/RFOF-NETWORK/RFOF-NETWORK/main/assets/rotating_cyber_brain.svg",
            showEmail: true
        };
        console.log("[Profil-Modul] Profildaten empfangen:", this.userProfile);
    }

    /**
     * Simuliert das Speichern von Profildaten im Backend.
     * @param {object} dataToSave - Die zu speichernden Daten.
     */
    async saveProfileData(dataToSave) {
        console.log("[Profil-Modul] Sende Profildaten zum Speichern an @RFOF-NETWORK:", dataToSave);
        // Simulierter API-Call
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("[Profil-Modul] Backend bestätigt: Daten gespeichert.");
        return true;
    }

    render() {
        if (!this.userProfile) {
            this.container.innerHTML = "<p>Lade Profil...</p>";
            return;
        }

        const usernameView = this.isEditingUsername
            ? `<input type="text" id="username-input" value="${this.userProfile.username}" placeholder="Benutzername wählen...">
               <button id="save-username-btn">Speichern</button>`
            : `<span id="edit-username-btn" title="Benutzername bearbeiten">@${this.userProfile.username}</span>`;

        const emailView = this.userProfile.showEmail
            ? `<span id="toggle-email-btn" title="E-Mail verbergen">${this.userProfile.email}</span>`
            : `<span id="toggle-email-btn" title="E-Mail anzeigen">[E-Mail verborgen]</span>`;

        this.container.innerHTML = `
            <div class="profile-container">
                <div class="profile-header">
                    <img src="${this.userProfile.pfp}" alt="Profilbild" class="profile-picture">
                </div>
                <div class="profile-body">
                    <div class="profile-username">${usernameView}</div>
                    <div class="profile-email">${emailView}</div>
                    <div class="profile-address">
                        <strong>Wallet:</strong> ${this.wallet.address}
                    </div>
                </div>
            </div>
        `;
        this.addEventListeners();
    }

    addEventListeners() {
        if (this.isEditingUsername) {
            document.getElementById('save-username-btn')?.addEventListener('click', () => this.handleSaveUsername());
            document.getElementById('username-input')?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleSaveUsername();
            });
        } else {
            document.getElementById('edit-username-btn')?.addEventListener('click', () => this.toggleUsernameEdit(true));
        }
        
        document.getElementById('toggle-email-btn')?.addEventListener('click', () => this.toggleEmailVisibility());
    }

    toggleUsernameEdit(isEditing) {
        this.isEditingUsername = isEditing;
        this.render();
    }

    async handleSaveUsername() {
        const input = document.getElementById('username-input');
        const newUsername = input.value.trim();

        if (newUsername && newUsername !== this.userProfile.username) {
            // Simuliere Prüfung, ob der Name verfügbar ist
            const success = await this.saveProfileData({ username: newUsername });
            if (success) {
                this.userProfile.username = newUsername;
            } else {
                alert("Benutzername konnte nicht gespeichert werden.");
            }
        }
        this.toggleUsernameEdit(false);
    }
    
    toggleEmailVisibility() {
        this.userProfile.showEmail = !this.userProfile.showEmail;
        this.saveProfileData({ showEmail: this.userProfile.showEmail });
        this.render();
    }
};
