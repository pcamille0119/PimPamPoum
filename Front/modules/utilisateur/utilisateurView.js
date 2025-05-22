export class UtilisateurView {
  static afficherInfos(utilisateur) {
    document.getElementById('prenom-utilisateur').textContent = utilisateur.prenom;
    document.getElementById('email-utilisateur').textContent = utilisateur.email;
    document.getElementById('role-utilisateur').textContent = utilisateur.role;
  }
}
