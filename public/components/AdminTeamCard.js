// AdminTeamCard.js
export default class AdminTeamCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (this.hasAttribute('team-data') && this.hasAttribute('drivers-data')) {
            try {
                const teamData = JSON.parse(this.getAttribute('team-data'));

                this.render(teamData);
            } catch (error) {
                console.error('Error parsing attributes:', error);
            }
        }
    }
    render(teamData) {
        const driversData = this.getAttribute('drivers-data') ? JSON.parse(this.getAttribute('drivers-data')) : [];
        let points = 0;
        driversData.forEach(driver => {
            points += driver.points;
        });

        this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/css/components/AdminTeamCard.css">
  
        
        <div class="team-card">
            <div class="team-card__header">
                <div class="team-card__position">${teamData.id}</div>
                <div class="team-card__name">
                <span class="team-card__color-bar" style="background-color: ${teamData.color};"></span>
                <span class="team-card__name-text">${teamData.name}</span>
                </div>
                <div class="team-card__logo">
                <img class="team-card__logo-img" src="${teamData.imageUrl}" alt="${teamData.name}">
                </div>
                <div class="team-card__points">
                ${points}
                <span class="team-card__points-label">PTS</span>
                </div>
            </div>
            
            <div class="team-card__drivers">
                ${this.renderDrivers(driversData)}
            </div>
            <div class="team-card__admin-card-actions">
                <a href="#" class="admin-card-actions__edit-button primary-button" data-team-id="${teamData.id}">Editar</a>
                <a href="#" class="admin-card-actions__remove-button secondary-button" data-team-id="${teamData.id}">Eliminar</a>
            </div>
        </div>
      `;

        this.shadowRoot.querySelector(".admin-card-actions__edit-button")
            .addEventListener("click", (e) => {
                e.preventDefault();
                const teamId = e.target.dataset.teamId;
                this.dispatchEvent(new CustomEvent("edit-team", {
                    detail: { teamId },
                    bubbles: true, // importante para que llegue al document
                    composed: true // necesario para salir del shadow DOM
                }));
            });

        this.shadowRoot.querySelector(".admin-card-actions__remove-button")
            .addEventListener("click", (e) => {
                e.preventDefault();
                const teamId = e.target.dataset.teamId;
                this.dispatchEvent(new CustomEvent("remove-team", {
                    detail: { teamId },
                    bubbles: true, // importante para que llegue al document
                    composed: true // necesario para salir del shadow DOM
                }));
            });
    }



    renderDrivers(driversData) {
        if (!driversData || driversData.length === 0) {
            return '<p class="team-card__no-drivers">Este equipo no tiene pilotos registrados.</p>';
        }

        return driversData.map(driver => {
            return `
          <div class="team-card__driver">
            <div class="team-card__driver-info">
              <div class="team-card__driver-name">
                <span>${driver.name}</span>
                <span class="team-card__driver-lastname">${driver.lastName}</span>
              </div>
              <img class="team-card__driver-photo" src="${driver.imageUrl}" alt="${driver.name}">
            </div>
            <div class="team-card__car-image grid-bg">
              ${driver.vehicle?.imageUrl
                    ? `<img src="${driver.vehicle.imageUrl}" alt="${driver.vehicle.name} car" style="width: 100%;">`
                    : `<span>Vehículo no asignado</span>`
                }
            </div>
          </div>
        `;
        }).join('');

    }
}

customElements.define('admin-team-card', AdminTeamCard);