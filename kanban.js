const appliedCards = document.getElementById("applied-cards");
const interviewCards = document.getElementById("interview-cards");
const offerCards = document.getElementById("offer-cards");
const rejectedCards = document.getElementById("rejected-cards");

function loadKanban() {
    fetch("get-applications.php")
        .then(response => response.json())
        .then(applications => {
            appliedCards.innerHTML = "";
            interviewCards.innerHTML = "";
            offerCards.innerHTML = "";
            rejectedCards.innerHTML = "";

            applications.forEach(application => {
                const card = document.createElement("div");

                card.classList.add("kanban-card");
                card.setAttribute("draggable", "true");
                card.dataset.id = application.id;

                card.innerHTML = `
                    <h4>${application.company}</h4>
                    <p>${application.position}</p>
                    <small>${application.date}</small>
                `;

                if (application.status === "Applied") {
                    appliedCards.appendChild(card);
                } else if (application.status === "Interview") {
                    interviewCards.appendChild(card);
                } else if (application.status === "Offer") {
                    offerCards.appendChild(card);
                } else if (application.status === "Rejected") {
                    rejectedCards.appendChild(card);
                }
            });
        });
}
let draggedCard = null;

document.addEventListener("dragstart", function(event) {
    if (event.target.classList.contains("kanban-card")) {
        draggedCard = event.target;
    }
});

document.querySelectorAll(".kanban-cards").forEach(column => {
    column.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    column.addEventListener("drop", function() {
    if (draggedCard) {
        const newStatus = column.dataset.status;
        const applicationId = draggedCard.dataset.id;

        const formData = new FormData();
        formData.append("id", applicationId);
        formData.append("status", newStatus);

        fetch("update-application.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            if (result === "success") {
                column.appendChild(draggedCard);
            }
        });
    }
});
});
loadKanban();