class AdminCircuitCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const data = {
            id: this.getAttribute("id"),
            name: this.getAttribute("name"),
            country: this.getAttribute("country"),
            lengthKm: this.getAttribute("length"),
            laps: this.getAttribute("laps"),
            curves: this.getAttribute("curves"),
            description: this.getAttribute("description"),
            imageUrl: this.getAttribute("image-url"),
        };

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/css/components/AdminCircuitsCard.css">
            <div class="circuit-card">
                <div class="circuit-card__header">
                    <div class="circuit-card__name">${data.name}</div>
                    <p>${data.country}</p>
                </div>
                <div class="circuit-card__image-container">
                    <img src="${data.imageUrl}" alt="${data.name}">
                </div>
                <div class="circuit-card__description">${data.description}</div>
                <div class="circuit-card__details">
                    <div>Laps: ${data.laps}</div>
                    <div>Length: ${data.lengthKm} km</div>
                    <div>Curves: ${data.curves}</div>
                </div>
                <div class="card__admin-card-actions">
                    <a href="#" class="admin-card-actions__edit-button primary-button" data-circuits-id="${data.id}">Editar</a>
                    <a href="#" class="admin-card-actions__remove-button secondary-button" data-circuits-id="${data.id}">Eliminar</a>
                </div>
            </div>
        `;
        this.shadowRoot.querySelector(".admin-card-actions__edit-button")
            .addEventListener("click", (e) => {
                e.preventDefault();
                const circuitsId = e.target.dataset.circuitsId;
                this.dispatchEvent(new CustomEvent("edit-circuits", {
                    detail: { circuitsId },
                    bubbles: true, // importante para que llegue al document
                    composed: true // necesario para salir del shadow DOM
                }));
            });

        this.shadowRoot.querySelector(".admin-card-actions__remove-button")
            .addEventListener("click", (e) => {
                e.preventDefault();
                const circuitsId = e.target.dataset.circuitsId;
                this.dispatchEvent(new CustomEvent("remove-circuits", {
                    detail: { circuitsId },
                    bubbles: true, // importante para que llegue al document
                    composed: true // necesario para salir del shadow DOM
                }));
            });
    }
}

customElements.define("admin-circuit-card", AdminCircuitCard);