document.addEventListener('DOMContentLoaded', function() {
    
    const dateInput = document.getElementById('date');
    const meteoToast = new bootstrap.Toast(document.getElementById('meteoToast'), { autohide: false });

    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today; // Bloque les dates passées

    function updateMeteo(selectedDate) {
        const meteoBody = document.querySelector('#meteoToast .toast-body');
        const date = new Date(selectedDate);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('fr-FR', options);

        const conditions = [
            { icon: '☀️', desc: 'Ensoleillé', temp: '22°C' },
            { icon: '⛅', desc: 'Partiellement nuageux', temp: '19°C' },
            { icon: '🌧️', desc: 'Pluvieux', temp: '15°C' },
            { icon: '⛈️', desc: 'Orageux', temp: '17°C' },
            { icon: '☁️', desc: 'Nuageux', temp: '18°C' }
        ];

        const dayIndex = date.getDate() % conditions.length;
        const condition = conditions[dayIndex];

        meteoBody.innerHTML = `
            <div class="meteo-content">
                <h5 class="mb-2">Prévisions pour le ${formattedDate}</h5>
                <div class="d-flex align-items-center">
                    <span class="meteo-icon me-3">${condition.icon}</span>
                    <div>
                        <p class="mb-1">${condition.desc}</p>
                        <p class="mb-0">Température: ${condition.temp}</p>
                    </div>
                </div>
                ${condition.desc === 'Pluvieux' || condition.desc === 'Orageux' ? 
                    '<div class="alert alert-warning mt-2 mb-0">⚠️ Conditions défavorables</div>' : 
                    '<div class="alert alert-success mt-2 mb-0">✅ Conditions favorables</div>'}
            </div>
        `;

        meteoToast.show();
    }

    dateInput.addEventListener('change', function() {
        if (this.value) {
            updateMeteo(this.value);
        }
    });

});

