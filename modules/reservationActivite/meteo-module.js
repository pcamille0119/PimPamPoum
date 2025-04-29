        document.addEventListener('DOMContentLoaded', function() {
            const dateInput = document.getElementById('date');
            const meteoContent = document.getElementById('meteoBlocContent');
            const apiKey = 'ba1b793ecb984252a29120525252904'; // Mets ta clé WeatherAPI ici
            const location = 'Nouméa';
        
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const formattedToday = `${year}-${month}-${day}`;

            dateInput.min = formattedToday;
            dateInput.value = formattedToday;
        
            // Météo affichée automatiquement au chargement de la page pour aujourd'hui
            updateMeteo(formattedToday);
        
            async function updateMeteo(selectedDate) {
                try {
                    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&lang=fr`);
                    const data = await response.json();
        
                    if (!response.ok) {
                        throw new Error(data.error.message);
                    }
        
                    const forecastDay = data.forecast.forecastday.find(day => day.date === selectedDate);
        
                    if (!forecastDay) {
                        throw new Error('Pas de prévisions disponibles pour cette date.');
                    }
        
                    const date = new Date(selectedDate);
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    const formattedDate = date.toLocaleDateString('fr-FR', options);
        
                    const condition = forecastDay.day.condition;
        
                    meteoContent.innerHTML = `
                        <div class="text-center">
                            <h5 class="mb-3">Météo à ${location} pour le ${formattedDate}</h5>
                            <div class="d-flex align-items-center justify-content-center">
                                <img src="https:${condition.icon}" alt="Icône météo" class="me-3">
                                <div>
                                    <p class="mb-1">${condition.text}</p>
                                    <p class="mb-0">Température : ${forecastDay.day.avgtemp_c}°C</p>
                                </div>
                            </div>
                            ${condition.text.toLowerCase().includes('pluie') || condition.text.toLowerCase().includes('orage') ?
                                '<div class="alert alert-warning mt-3 mb-0">⚠️ Conditions défavorables</div>' :
                                '<div class="alert alert-success mt-3 mb-0">✅ Conditions favorables</div>'
                            }
                        </div>
                    `;
        
                } catch (error) {
                    meteoContent.innerHTML = `<div class="alert alert-danger">Erreur météo : ${error.message}</div>`;
                }
            }
        
            // ➡️ Mise à jour si l'utilisateur change la date
            dateInput.addEventListener('change', function() {
                if (this.value) {
                    updateMeteo(this.value);
                }
            });
        });
        
    

