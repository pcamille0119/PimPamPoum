class NavBarUtilisateur extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.innerHTML = `
		<nav class="navbar navbar-dark navbar-expand-lg bg-dark px-3">
			<a class="navbar-brand">
				<img src="../../public/logo-gite-BLANC.png" alt="Accueil" width="160" height="60" title="Accueil">
			</a>
			<div class="ms-auto">
				<button id="btn-deconnexion" class="btn btn-outline-light">Déconnexion</button>
			</div>
		</nav>
		`;
	}
}

customElements.define('navbar-utilisateur', NavBarUtilisateur);
