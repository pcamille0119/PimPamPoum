let chambres = [];

// Charger les chambres depuis le fichier JSON
fetch('./liste-chambre.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du fichier JSON');
    }
    return response.json();
  })
  .then((data) => {
    chambres = data;

    // Ajouter les écouteurs d'événements
    ["checkin-date", "checkout-date", "invités"].forEach(id => {
      document.getElementById(id).addEventListener("change", updateChambreSelect);
    });

    // Déclencher l'affichage initial
    updateChambreSelect();
  })
  .catch((error) => {
    console.error('Erreur :', error);
  });

// Réservations existantes simulées
const reservations = [
  // Exemple : { chambre: "ME01", date_entree: "2025-04-28", date_sortie: "2025-04-30" }
];

// Vérification de disponibilité pour une chambre donnée
function isAvailable(chambre, checkin, checkout) {
  return !reservations.some((resa) => {
    return (
      resa.chambre === chambre &&
      !(new Date(resa.date_sortie) <= new Date(checkin) || new Date(resa.date_entree) >= new Date(checkout))
    );
  });
}

// Chemins images pour Mer et Jardin
const bungalowImages = {
  mer: './galerie/Bungalow-Mer-01.png',
  jardin: './galerie/Bungalow-Jardin-01.png'
};

function updateChambreSelect() {
  const checkin = document.getElementById("checkin-date").value;
  const checkout = document.getElementById("checkout-date").value;
  const guestsValue = document.getElementById("invités").value;
  const guests = guestsValue ? parseInt(guestsValue) : 4; // Par défaut à 4 si non sélectionné
  const chambreListe = document.getElementById("chambre-liste");

  chambreListe.innerHTML = ''; // Réinitialiser la liste

  // Utiliser la date du jour si rien n'est rempli
  const today = new Date().toISOString().split('T')[0];
  const checkinDate = checkin || today;
  const checkoutDate = checkout || today;

  const results = chambres.filter(
    (chambre) =>
      chambre.capacite >= guests &&
      isAvailable(chambre.id, checkinDate, checkoutDate)
  );

  // Message si aucune chambre
  if (results.length === 0) {
    chambreListe.innerHTML = `<p>Aucune chambre disponible pour votre sélection.</p>`;
    return;
  }

  results.forEach((chambre) => {
    const typeImage = chambre.id.includes('ME') ? 'mer' : 'jardin';

    const div = document.createElement('div');
    div.className = 'chambre-card';
    div.setAttribute('data-id', chambre.id);

    div.innerHTML = `
      <img src="${bungalowImages[typeImage]}" alt="Chambre ${chambre.id}">
      <div class="chambre-card-title">Chambre ${chambre.id} <br><small>(${chambre.capacite} pers)</small></div>
    `;

    chambreListe.appendChild(div);

    div.addEventListener('click', () => {
      document.querySelectorAll('.chambre-card').forEach(card => card.classList.remove('selected'));
      div.classList.add('selected');
      document.getElementById('reservation-form').dataset.selectedChambre = chambre.id;
    });
  });
}

// Empêcher les dates passées
document.addEventListener('DOMContentLoaded', () => {
  const checkin = document.getElementById("checkin-date");
  const checkout = document.getElementById("checkout-date");
  const today = new Date().toISOString().split("T")[0];
  checkin.min = today;
  checkout.min = today;
});

// Gestion soumission
document.getElementById("reservation-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const checkin = document.getElementById("checkin-date").value;
  const checkout = document.getElementById("checkout-date").value;
  const guests = document.getElementById("invités").value;
  const chambreId = document.getElementById("reservation-form").dataset.selectedChambre;

  if (!checkin || !checkout || !guests) {
    alert("Veuillez remplir tous les champs correctement.");
    return;
  }

  if (!chambreId) {
    alert("Merci de sélectionner une chambre.");
    return;
  }

  const chambreData = chambres.find(chambre => chambre.id === chambreId);
  showConfirmationPopup(chambreData, checkin, checkout, guests);
});

function showConfirmationPopup(chambreData, checkin, checkout, guests) {
  const popupContainer = document.getElementById('popup-container');
  popupContainer.innerHTML = `
    <div class="popup-content text-start" id="popup-inner">
      <h4 class="mb-3">Confirmez votre réservation :</h4>
      <p><strong>Chambre :</strong> ${chambreData.id}</p>
      <p><strong>Vue :</strong> ${chambreData.vue}</p>
      <p><strong>Capacité :</strong> ${chambreData.capacite} personnes</p>
      <p><strong>Date d'arrivée :</strong> ${new Date(checkin).toLocaleDateString('fr-FR')}</p>
      <p><strong>Date de départ :</strong> ${new Date(checkout).toLocaleDateString('fr-FR')}</p>
      <p><strong>Nombre d'invités :</strong> ${guests}</p>
      <div class="d-flex justify-content-between mt-4">
          <button class="btn btn-secondary" id="cancel-btn">Annuler</button>
          <button class="btn btn-success" id="confirm-btn">Confirmer la réservation</button>
      </div>
    </div>
  `;
  popupContainer.classList.remove('d-none');

  // Gestion du clic sur "Confirmer"
  document.getElementById('confirm-btn').addEventListener('click', () => confirmReservation(chambreData.id));

  // Gestion du clic sur "Annuler"
  document.getElementById('cancel-btn').addEventListener('click', () => {
    popupContainer.classList.add('d-none');
    popupContainer.innerHTML = '';
  });

  // Fermeture si clic à l'extérieur de la pop-up
  popupContainer.addEventListener('click', function (e) {
    if (e.target.id === 'popup-container') {
      popupContainer.classList.add('d-none');
      popupContainer.innerHTML = '';
    }
  }); 

}


function confirmReservation(chambreId) {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const serial = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
  const numeroReservation = `CH${year}${month}${serial}`;

  const checkin = document.getElementById("checkin-date").value;
  const checkout = document.getElementById("checkout-date").value;

  // Objet de réservation complet
  const reservation = {
    numero: numeroReservation,
    chambre: chambreId,
    date_entree: checkin,
    date_sortie: checkout
  };

  // Récupération et sauvegarde
  const reservationsStored = JSON.parse(localStorage.getItem('reservations_chambres')) || [];
  reservationsStored.push(reservation);
  localStorage.setItem('reservations_chambres', JSON.stringify(reservationsStored));

  // Affichage final
  const popupContainer = document.getElementById('popup-container');
  popupContainer.innerHTML = `
    <div class="popup-content p-4 border rounded bg-white text-center">
      <h4 class="mb-3">Réservation réussie !</h4>
      <p>Votre numéro de réservation est :</p>
      <h3 class="text-primary">${numeroReservation}</h3>
      <p>Il sera à présenter sur place.</p>
      <button class="btn btn-primary mt-3" onclick="location.reload()">Fermer</button>
    </div>
  `;
}

