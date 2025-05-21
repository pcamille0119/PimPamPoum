// Initialisation.
let today = new Date();
let max   = new Date();
today.setDate(today.getDate() + 1);
max.setDate(max.getDate() + 8);
let JourSortie = document.getElementById('ChoixJour');
JourSortie.valueAsDate = today;
JourSortie.setAttribute("min", today.toISOString().substring(0, 10));
JourSortie.setAttribute("max", max.toISOString().substring(0, 10));

// Réservation
$(document).ready(function(){
    $("#rez").click(function(){
		let jour 	= document.getElementById('ChoixJour').value;
		let debut 	= document.getElementById('ChoixHeureDebut').value;
		let fin 	= document.getElementById('ChoixHeureFin').value;
		let nbP 	= document.getElementById('ChoixPersonne').value;
		console.log(debut, fin);
		if (debut > fin) {
			alert("L'heure de début ne peut pas être supérieure à celle de fin !");
			return;
		}

		// TODO : erreur si fichier local, nécessite HTTP !
		var chemin = '../../data/liste-chambre.json';
		$.getJSON(chemin, function(data) {
			console.log(data);
			alert('Réservation faite !')
		});
    });
});
