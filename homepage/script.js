document.addEventListener("DOMContentLoaded", function () {
    fetchReports();
    updateStats();
});

// Initialize Google Maps Heatmap
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: 20.5937, lng: 78.9629 },
    });

    var heatmapData = [
        new google.maps.LatLng(28.7041, 77.1025),
        new google.maps.LatLng(19.0760, 72.8777),
        new google.maps.LatLng(12.9716, 77.5946),
    ];

    new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map,
    });
}

// Fetch Latest Reports
function fetchReports() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const reportList = document.getElementById("report-list");
            data.forEach(report => {
                let reportDiv = document.createElement("div");
                reportDiv.classList.add("report-card");

                reportDiv.innerHTML = `
                    <h3>${report.title}</h3>
                    <p><strong>Location:</strong> ${report.location}</p>
                    <p><strong>Details:</strong> ${report.details}</p>
                `;

                reportList.appendChild(reportDiv);
            });
        });
}

// Update Stats
function updateStats() {
    document.getElementById("total-cases").textContent = "1,245";
    document.getElementById("funds-misused").textContent = "$4.5M";
    document.getElementById("resolved-cases").textContent = "780";
}

// Newsletter Subscription
function subscribe() {
    let email = document.getElementById("email").value;
    if (!email.includes("@")) {
        document.getElementById("subscribe-message").textContent = "Invalid Email!";
        return;
    }
    document.getElementById("subscribe-message").textContent = "✅ Subscribed!";
}

// Toggle Dark Mode
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
