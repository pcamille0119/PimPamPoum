class NavBar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
		<nav class="navbar navbar-dark navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<a class="navbar-brand" href="../../index.html">
					<img src="../../public/logo-gite-BLANC.png" alt="Accueil" width="160" height="60" class="d-inline-block align-text-top" title="Accueil">
				</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse justify-content-center" id="navbarNav">
					<ul class="navbar-nav fs-5">
						<li class="nav-item"><a class="nav-link text-white" href="../chambre/chambre-index.html">Nos chambres</a></li>
						<li class="nav-item"><a class="nav-link text-white" href="../repas/repas-index.html">Notre restaurant</a></li>
						<li class="nav-item"><a class="nav-link text-white" href="../cheval/cheval-index.html">Randonnée équestre</a></li>
						<li class="nav-item"><a class="nav-link text-white" href="../kayak/kayak-index.html">Sortie en kayak</a></li>
						<li class="nav-item"><a class="nav-link text-white" href="../bagne/bagne-index.html">Visite du bagne</a></li>
						<li class="nav-item"><a class="nav-link text-white" href="../garderie/garderie-index.html">La garderie</a></li>
					</ul>
				</div>
				<!-- Bouton Connexion -->
				<div class="d-flex ms-auto">
					<a href="../connexion/connexion.html" class="btn btn-outline-light">
						 Connexion
					</a>
				</div>
			</div>
		</nav>
		`;
  }
}

customElements.define('menu-top', NavBar);
