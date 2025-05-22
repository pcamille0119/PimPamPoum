export class UtilisateurModel {
  static getUtilisateurConnecte() {
    return JSON.parse(localStorage.getItem('utilisateur'));
  }
}
