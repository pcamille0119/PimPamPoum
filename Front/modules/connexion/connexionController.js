import { ConnexionModel } from './connexionModel.js';
import { ConnexionView } from './connexionView.js';

document.getElementById('form-connexion').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const motDePasse = document.getElementById('motdepasse').value;

  try {
    const data = await ConnexionModel.connecter(email, motDePasse);
    if (data.success) {
      ConnexionView.afficherMessage("Connexion réussie ✅");
      // Redirige ou stocke le token ici
    } else {
      ConnexionView.afficherMessage(data.message || "Échec de la connexion", "error");
    }
  } catch (err) {
    ConnexionView.afficherMessage("Erreur serveur", "error");
  }
});
