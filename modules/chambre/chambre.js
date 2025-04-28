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
    chambres = data; // Stocker les chambres
  })
  .catch((error) => {
    console.error('Erreur :', error);
  });

// Réservations existantes simulées
const reservations = [
  // >>> Tes données de réservations simulées ici <<<
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

// Gérer la mise à jour de la liste des chambres disponibles
function updateChambreSelect() {
  const checkin = document.getElementById("checkin-date").value;
  const checkout = document.getElementById("checkout-date").value;
  const guests = parseInt(document.getElementById("invités").value);
  const chambreSelect = document.getElementById("chambre-select");

  chambreSelect.innerHTML = '<option value="">Sélectionnez une chambre</option>'; // reset

  if (!checkin || !checkout || !guests) {
    return;
  }

  const results = chambres.filter(
    (chambre) =>
      chambre.capacite >= guests && isAvailable(chambre.id, checkin, checkout)
  );

  results.forEach(chambre => {
    const option = document.createElement('option');
    option.value = chambre.id;
    option.textContent = `Chambre ${chambre.id} - ${chambre.vue} (Capacité ${chambre.capacite})`;
    chambreSelect.appendChild(option);
  });
}

// Mettre à jour la liste des chambres quand un champ change
["checkin-date", "checkout-date", "invités"].forEach(id => {
  document.getElementById(id).addEventListener("change", updateChambreSelect);
});

// Gérer la soumission du formulaire
document.getElementById("reservation-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const checkin = document.getElementById("checkin-date").value;
  const checkout = document.getElementById("checkout-date").value;
  const guests = document.getElementById("invités").value;
  const chambreId = document.getElementById("chambre-select").value;

  if (!checkin || !checkout || !guests || !chambreId) {
    alert("Veuillez remplir tous les champs correctement.");
    return;
  }

  // Retrouver les infos de la chambre sélectionnée
  const chambreData = chambres.find(chambre => chambre.id === chambreId);

  showConfirmationPopup(chambreData, checkin, checkout, guests);
});

// Fonction pour afficher la pop-up de confirmation
function showConfirmationPopup(chambreData, checkin, checkout, guests) {
  const popupContainer = document.getElementById('popup-container');

  popupContainer.innerHTML = `
    <div class="popup-content p-4 border rounded bg-white">
      <h4 class="mb-3">Confirmez votre réservation :</h4>
      <p><strong>Chambre :</strong> ${chambreData.id}</p>
      <p><strong>Vue :</strong> ${chambreData.vue}</p>
      <p><strong>Capacité :</strong> ${chambreData.capacite} personnes</p>
      <p><strong>Date d'arrivée :</strong> ${checkin}</p>
      <p><strong>Date de départ :</strong> ${checkout}</p>
      <p><strong>Nombre d'invités :</strong> ${guests}</p>
      <button class="btn btn-success mt-3" id="confirm-btn">Confirmer la réservation</button>
    </div>
  `;

  popupContainer.classList.remove('d-none');

  document.getElementById('confirm-btn').addEventListener('click', () => confirmReservation(chambreData.id));
}

// Fonction pour confirmer la réservation
function confirmReservation(chambreId) {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const serial = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');

  // Numéro de réservation pour chambre (préfixe CH)
  const numeroReservation = `CH${year}${month}${serial}`;

  // Stocker dans localStorage
  const reservationsStored = JSON.parse(localStorage.getItem('reservations_chambres')) || [];
  reservationsStored.push({
    numero: numeroReservation,
    chambre: chambreId
  });
  localStorage.setItem('reservations_chambres', JSON.stringify(reservationsStored));

  // Affichage pop-up de succès
  const popupContainer = document.getElementById('popup-container');
  popupContainer.innerHTML = `
    <div class="popup-content p-4 border rounded bg-white text-center">
      <h4 class="mb-3">Réservation réussie !</h4>
      <p>Votre numéro de réservation est :</p>
      <h3 class="text-primary">${numeroReservation}</h3>
      <button class="btn btn-primary mt-3" onclick="location.reload()">Fermer</button>
    </div>
  `;
}
