document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('reservation-form');
    const activiteSelect = document.getElementById('activite');
    const participantsLabel = document.getElementById('participants-label');
    const participantsSelect = document.getElementById('participants');
    const creneauSelect = document.getElementById('creneau');
    const boutonReserver = form.querySelector('button[type="submit"]');
    const numeroChambreInput = document.getElementById('numero-chambre');
    const dateInput = document.getElementById('date');

    let reservationChambreTrouvee = null; // Permet de savoir si une réservation est trouvée
    boutonReserver.disabled = true;

    // 🔵 Forcer majuscules sur numéro de réservation
    numeroChambreInput.addEventListener('input', () => {
        numeroChambreInput.value = numeroChambreInput.value.toUpperCase();
    });

    // 🔵 Vérification du numéro de réservation
    numeroChambreInput.addEventListener('blur', () => {
        const reservations = JSON.parse(localStorage.getItem('reservations_chambres')) || [];
        const numeroSaisi = numeroChambreInput.value.trim();

        reservationChambreTrouvee = reservations.find(resa => resa.numero === numeroSaisi);

        if (reservationChambreTrouvee) {
            // Si numéro trouvé, on adapte le champ date
            dateInput.disabled = false;
            dateInput.min = reservationChambreTrouvee.date_entree;
            dateInput.max = reservationChambreTrouvee.date_sortie;
            dateInput.value = reservationChambreTrouvee.date_entree; // auto sélectionner la première date

            activiteSelect.disabled = false;
            participantsLabel.disabled = false;
            participantsSelect.disabled = false;
            creneauSelect.disabled = false;
            boutonReserver.disabled = false; // ✅ activer le bouton
        } else {
            alert('Erreur : Numéro de réservation de chambre invalide.');
            dateInput.disabled = true;
            dateInput.value = '';
            activiteSelect.disabled = true;
            participantsLabel.disabled = true;
            participantsSelect.disabled = true;
            creneauSelect.disabled = true;
            boutonReserver.disabled = true; // ❌ désactiver le bouton
        }
    });

    // 🔵 Mise à jour dynamique des créneaux selon l'activité choisie
    activiteSelect.addEventListener('change', () => {
        const selectedActivity = activiteSelect.value;
        updateCreneaux(selectedActivity);
        updateParticipantsField(selectedActivity);
    });

    // 🔵 Soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Vérifier si le numéro est correct
        if (!reservationChambreTrouvee) {
            alert("Veuillez entrer un numéro de réservation de chambre valide pour continuer.");
            return;
        }

        showConfirmationPopup();
    });

    // Gestion du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showConfirmationPopup();
    });

    function updateCreneaux(activity) {
        const options = {
            repas: ["Midi", "Soir"],
            randonnee: ["Matin 9h-11h avec Emma", "Après-midi 14h-16h avec Lucas"],
            kayak: ["9h-10h", "10h-11h", "11h-12h", "13h-14h", "14h-15h", "15h-16h"],
            bagne: ["8h-9h30", "10h-11h30", "13h-14h30"],
            garderie: ["Matin (7h-12h)", "Après-midi (13h-14h)", "Journée complète (7h-16h)"]
        };

        creneauSelect.innerHTML = '<option value="" disabled selected hidden>Sélectionnez un créneau</option>';
        options[activity]?.forEach(creneau => {
            const option = document.createElement('option');
            option.value = creneau;
            option.textContent = creneau;
            creneauSelect.appendChild(option);
        });
    }

    function updateParticipantsField(activity) {
        if (activity === "garderie") {
            participantsLabel.textContent = "Nombre d'enfants";
            participantsSelect.innerHTML = `
                <option value="" disabled selected hidden>Sélectionnez</option>
                <option value="1">1 enfant</option>
                <option value="2">2 enfants</option>
                <option value="3">3 enfants</option>
            `;
        } else if (activity === "repas") { 
            participantsLabel.textContent = "Réservez une table";
            participantsSelect.innerHTML = `
                <option value="" disabled selected hidden>Réservez une table pour...</option>
                <option value="1">1 personne</option>
                <option value="2">2 personnes</option>
                <option value="3">3 personnes</option>
                <option value="4">4 personnes</option>
            `;
        } else {
            participantsLabel.textContent = "Nombre de participants";
            participantsSelect.innerHTML = `
                <option value="" disabled selected hidden>Sélectionnez le nombre de participants</option>
                <option value="1">1 participant</option>
                <option value="2">2 participants</option>
                <option value="3">3 participants</option>
                <option value="4">4 participants</option>
            `;
        }
    }
    

    function showConfirmationPopup() {
        const numeroChambre = numeroChambreInput.value;
        const activite = activiteSelect.options[activiteSelect.selectedIndex].text;
        const rawDate = document.getElementById('date').value;
        const participants = participantsSelect.options[participantsSelect.selectedIndex].text;
        const creneau = creneauSelect.options[creneauSelect.selectedIndex].text;
    
        const dateObj = new Date(rawDate);
        const formattedDate = dateObj.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    
        const popupHtml = `
            <div class="popup-content text-start" id="popup-inner">
                <h4 class="mb-3">Confirmez votre réservation :</h4>
                <p><strong>Numéro de chambre :</strong> ${numeroChambre}</p>
                <p><strong>Activité :</strong> ${activite}</p>
                <p><strong>Date :</strong> ${formattedDate}</p>
                <p><strong>Nombre :</strong> ${participants}</p>
                <p><strong>Créneau :</strong> ${creneau}</p>
                <div class="d-flex justify-content-between mt-4">
                    <button class="btn btn-secondary" id="cancel-btn">Annuler</button>
                    <button class="btn btn-success" id="confirm-btn">Confirmer la réservation</button>
                </div>
            </div>
        `;
    
        const popupContainer = document.getElementById('popup-container');
        popupContainer.innerHTML = popupHtml;
        popupContainer.classList.remove('d-none');
    
        // Bouton confirmation
        document.getElementById('confirm-btn').addEventListener('click', confirmReservation);
    
        // Bouton annuler
        document.getElementById('cancel-btn').addEventListener('click', () => {
            popupContainer.classList.add('d-none');
            popupContainer.innerHTML = '';
        });
    
        // Fermeture si on clique à l'extérieur
        popupContainer.addEventListener('click', (e) => {
            const isClickInside = e.target.closest('#popup-inner');
            if (!isClickInside) {
                popupContainer.classList.add('d-none');
                popupContainer.innerHTML = '';
            }
        });
    }

    function confirmReservation() {
        const activiteCode = {
            repas: 'RE',
            randonnee: 'RA',
            kayak: 'KA',
            garderie: 'GA',
            bagne: 'BA'
        };

        const selectedActivity = activiteSelect.value;
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2);
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const serial = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');

        const numeroReservation = `${activiteCode[selectedActivity]}${year}${month}${serial}`;

        // Stocker dans le localStorage
        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(numeroReservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        // Réinitialiser le formulaire
        form.reset();

        // Remettre le champ participants par défaut
         updateParticipantsField("");

        // Remettre le champ créneau vide
         creneauSelect.innerHTML = '<option value="">Sélectionnez un créneau</option>';

        // Affichage pop-up succès
        const popupContainer = document.getElementById('popup-container');
        popupContainer.innerHTML = `
            <div class="popup-content p-4 border rounded bg-white text-center">
                <h4 class="mb-3">Réservation réussie !</h4>
                <p>Votre numéro de réservation est le:</p>
                <h3 class="text-primary">${numeroReservation}</h3>
                <p>Il sera à présenter sur place. </p>
                <button class="btn btn-primary mt-3" onclick="location.reload()">Fermer</button>
            </div>
        `;
    }
});

