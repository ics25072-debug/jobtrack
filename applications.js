const applicationsBody = document.getElementById("applications-body");
const searchInput = document.getElementById("search-input");
const statusFilter = document.getElementById("status-filter");

let applications = [];

function loadApplications() {
    fetch("get-applications.php")
        .then(response => response.json())
        .then(data => {
            applications = data;
            displayApplications(applications);
        });
}
function applyFilters() {
    const searchText = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    const filtered = applications.filter(application => {
        const matchesSearch =
            application.company.toLowerCase().includes(searchText) ||
            application.position.toLowerCase().includes(searchText);

        const matchesStatus =
            selectedStatus === "All" ||
            application.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    displayApplications(filtered);
}
searchInput.addEventListener("input", applyFilters);
statusFilter.addEventListener("change", applyFilters);
function displayApplications(list) {
    applicationsBody.innerHTML = "";

    list.forEach(application => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${application.company}</td>
            <td>${application.position}</td>
            <td>${application.status}</td>
            <td>${application.date}</td>
        `;

        applicationsBody.appendChild(row);
    });
}
loadApplications();