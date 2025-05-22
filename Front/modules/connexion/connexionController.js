import { ConnexionModel } from './connexionModel.js';
import { ConnexionView } from './connexionView.js';

document.getElementById('form-connexion').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const motDePasse = document.getElementById('motdepasse').value.trim();

    // Vérification côté front
    if (!email || !motDePasse) {
        ConnexionView.afficherMessage("Tous les champs sont requis", "error");
        return;
    }

    // Vérifie que l'email a un format valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        ConnexionView.afficherMessage("Adresse email invalide", "error");
        return;
    }

    try {
        const data = await ConnexionModel.connecter(email, motDePasse);

        if (data.success) {
            ConnexionView.afficherMessage("Connexion réussie ✅");
            localStorage.setItem('utilisateur', JSON.stringify(data.utilisateur));
            window.location.href = "../utilisateur/utilisateur.html";
        } else {
            ConnexionView.afficherMessage(data.message || "Échec de la connexion", "error");
        }
    } catch (err) {
        ConnexionView.afficherMessage("Erreur serveur", "error");
    }
});
