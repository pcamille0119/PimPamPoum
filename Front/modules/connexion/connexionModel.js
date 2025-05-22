export class ConnexionModel {
  static async connecter(email, motDePasse) {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, motDePasse }),
    });
    return response.json();
  }
}
