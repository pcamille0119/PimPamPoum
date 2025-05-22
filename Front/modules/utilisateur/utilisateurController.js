import { UtilisateurModel } from './utilisateurModel.js';
import { UtilisateurView } from './utilisateurView.js';

const utilisateur = UtilisateurModel.getUtilisateurConnecte();

if (!utilisateur) {
  window.location.href = "../connexion/connexion.html";
} else {
  UtilisateurView.afficherInfos(utilisateur);
}

const boutonDeconnexion = document.getElementById("btn-deconnexion");
if (boutonDeconnexion) {
  boutonDeconnexion.addEventListener("click", () => {
    localStorage.removeItem("utilisateur");
    window.location.href = "../connexion/connexion.html";
  });
}

