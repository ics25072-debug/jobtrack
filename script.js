const addBtn = document.getElementById("add-btn");
const applicationForm = document.getElementById("application-form");
const jobForm = document.getElementById("job-form");
const applicationsBody = document.getElementById("applications-body");
let editingId = null;
  function loadApplications() {
    fetch("get-applications.php")
        .then(response => response.json())
        .then(applications => {
            applicationsBody.innerHTML = "";
            document.getElementById("total-count").textContent = applications.length;

            document.getElementById("interview-count").textContent =
            applications.filter(application => application.status === "Interview").length;

            document.getElementById("offer-count").textContent =
              applications.filter(application => application.status === "Offer").length;

            document.getElementById("rejected-count").textContent =
              applications.filter(application => application.status === "Rejected").length;

            applications.forEach(application => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${application.company}</td>
                    <td>${application.position}</td>
                    <td>
                      <select class="status-select" data-id="${application.id}">
                        <option value="Applied" ${application.status === "Applied" ? "selected" : ""}>Applied</option>
                        <option value="Interview" ${application.status === "Interview" ? "selected" : ""}>Interview</option>
                        <option value="Offer" ${application.status === "Offer" ? "selected" : ""}>Offer</option>
                        <option value="Rejected" ${application.status === "Rejected" ? "selected" : ""}>Rejected</option>
                      </select>
                    </td>
                    <td>${application.date}</td>
                    <td>
                      <button class="edit-btn" data-id="${application.id}">Edit</button>
                      <button class="delete-btn" data-id="${application.id}">Delete</button>
                    </td>
                `;

                applicationsBody.appendChild(row);
            });
            const editButtons = document.querySelectorAll(".edit-btn");

            editButtons.forEach(button => {
              button.addEventListener("click", function() {
              const id = this.dataset.id;
              const application = applications.find(app => app.id == id);

              editingId = id;

              document.getElementById("company").value = application.company;
              document.getElementById("position").value = application.position;
              document.getElementById("status").value = application.status;
              document.getElementById("date").value = application.date;

              applicationForm.style.display = "flex";
            });
          });
            const deleteButtons = document.querySelectorAll(".delete-btn");

            deleteButtons.forEach(button => {
              button.addEventListener("click", function() {
                const id = this.dataset.id;

                if (!confirm("Are you sure you want to delete this application?")) {
                  return;
                }

            const formData = new FormData();
            formData.append("id", id);

            fetch("delete-application.php", {
              method: "POST",
              body: formData
            })
            .then(response => response.text())
            .then(result => {
              if (result === "success") {
                editingId = null;
                  loadApplications();
              }
            })
            .catch(error => {
              console.error(error);
              alert("Something went wrong.");
            });
          });
        });
            const statusSelects = document.querySelectorAll(".status-select");

            statusSelects.forEach(select => {
              select.addEventListener("change", function() {
                const id = this.dataset.id;
                const status = this.value;

                const formData = new FormData();
                formData.append("id", id);
                formData.append("status", status);

                fetch("update-application.php", {
                  method: "POST",
                  body: formData
                })
                .then(response => response.text())
                .then(result => {
                if (result === "success") {
                  loadApplications();
                }
                });
              });
            });
          });
    }
loadApplications();
addBtn.addEventListener("click", function() {
  applicationForm.style.display = "flex";
});
jobForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const company = document.getElementById("company").value;
    const position = document.getElementById("position").value;
    const status = document.getElementById("status").value;
    const date = document.getElementById("date").value;
    const formData = new FormData();
    
    formData.append("company", company);
    formData.append("position", position);
    formData.append("status", status);
    formData.append("date", date);
    let url;

    if (editingId === null) {
      url = "save-application.php";
    } else {
      url = "edit-application.php";
      formData.append("id", editingId);
    }
    fetch(url, {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(result => {
      if (result === "success") {
        alert("Application saved successfully!");
        jobForm.reset();
        applicationForm.style.display = "none";
        loadApplications();
      }
    })
    .catch(error => {
      console.error(error);
      alert("Something went wrong.");
    });
});