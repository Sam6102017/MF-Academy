// Fonction pour charger les données depuis data.json
async function loadData() {
    const response = await fetch("data.json");
    return await response.json();
}

// Affichage des équipes dans un tableau
function displayTeams(tableId, teams) {
    const table = document.getElementById(tableId);
    teams.forEach(t => {
        table.innerHTML += `
            <tr>
                <td><img src="${t.logo}" class="team-logo" alt=""> ${t.name}</td>
                <td>${t.points}</td>
                <td>${t.diff}</td>
                <td>${t.goals}</td>
                <td>${t.conceded}</td>
            </tr>
        `;
    });
}

// Affichage du calendrier (J1, J2, J3…)
function displayCalendar(divId, calendar) {
    const div = document.getElementById(divId);
    Object.keys(calendar).forEach(day => {
        div.innerHTML += `<h3>${day}</h3>`;
        calendar[day].forEach(m => {
            div.innerHTML += `<p>${m.match} — <strong>${m.score}</strong></p>`;
        });
    });
}

// Chargement automatique selon la page
loadData().then(data => {

    // Page Clasico Cup
    if (document.getElementById("clasico-table")) {
        displayTeams("clasico-table", data.clasico.teams);
        displayCalendar("clasico-calendar", data.clasico.calendar);
    }

    // Page Ranked League
    if (document.getElementById("ranked-table")) {
        displayTeams("ranked-table", data.ranked.teams);
        displayCalendar("ranked-calendar", data.ranked.calendar);
    }

});
