export class ConnexionView {
  static afficherMessage(message, type = 'info') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.style.color = type === 'error' ? 'red' : 'green';
  }
}
