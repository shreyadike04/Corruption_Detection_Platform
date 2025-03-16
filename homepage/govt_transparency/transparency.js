document.addEventListener("DOMContentLoaded", function () {
    fetchProjects();
});

let projectsData = [];

function fetchProjects() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            projectsData = data;
            displayProjects(projectsData);
            updateDashboard(projectsData);
        })
        .catch(error => console.error("Error loading data:", error));
}

function displayProjects(projects) {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";

    projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-card");
        if (project.suspicious) projectDiv.classList.add("suspicious");

        projectDiv.innerHTML = `
            <h3>${project.name}</h3>
            <p><strong>Category:</strong> ${project.category}</p>
            <p><strong>Funds Allocated:</strong> $${project.allocatedFunds}</p>
            <p><strong>Funds Spent:</strong> $${project.spentFunds}</p>
            <p><strong>Status:</strong> ${project.status}</p>
            ${project.suspicious ? "<p class='alert'>⚠️ Suspicious Transaction</p>" : ""}
            <button onclick="deleteProject('${project.name}')">🗑️ Delete</button>
        `;

        projectList.appendChild(projectDiv);
    });
}

function updateDashboard(projects) {
    let totalBudget = 0, totalSpent = 0, suspiciousCount = 0;
    projects.forEach(p => {
        totalBudget += p.allocatedFunds;
        totalSpent += p.spentFunds;
        if (p.suspicious) suspiciousCount++;
    });
    document.getElementById("total-budget").textContent = `$${totalBudget}`;
    document.getElementById("funds-spent").textContent = `$${totalSpent}`;
    document.getElementById("suspicious-transactions").textContent = suspiciousCount;
}

function searchProjects() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    displayProjects(projectsData.filter(p => p.name.toLowerCase().includes(searchInput)));
}

function filterProjects() {
    let category = document.getElementById("filter-category").value;
    let status = document.getElementById("filter-status").value;
    displayProjects(projectsData.filter(p =>
        (category ? p.category === category : true) &&
        (status ? p.status === status : true)
    ));
}

function filterSuspicious() {
    displayProjects(projectsData.filter(p => p.suspicious));
}

function sortProjects() {
    displayProjects([...projectsData].sort((a, b) => b.spentFunds - a.spentFunds));
}

function addProject() {
    let name = document.getElementById("new-project-name").value;
    let funds = Number(document.getElementById("new-project-funds").value);
    let category = document.getElementById("new-project-category").value;

    if (!name || !funds) return alert("Please fill all fields!");

    projectsData.push({
        name, allocatedFunds: funds, spentFunds: 0,
        category, status: "Ongoing", suspicious: false
    });

    displayProjects(projectsData);
    updateDashboard(projectsData);
}

function deleteProject(name) {
    projectsData = projectsData.filter(p => p.name !== name);
    displayProjects(projectsData);
    updateDashboard(projectsData);
}

// Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}


const icon = document.createElement("img");
icon.src = "assets/check-mark.svg";
icon.alt = "Verified";
document.body.appendChild(icon);
