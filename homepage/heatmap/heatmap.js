document.addEventListener("DOMContentLoaded", function () {
    // Sample Data for Heatmap
    const corruptionData = [
        { location: { lat: 28.6139, lng: 77.2090 }, weight: 5 }, // Delhi
        { location: { lat: 19.0760, lng: 72.8777 }, weight: 4 }, // Mumbai
        { location: { lat: 13.0827, lng: 80.2707 }, weight: 3 }, // Chennai
        { location: { lat: 22.5726, lng: 88.3639 }, weight: 4 }, // Kolkata
        { location: { lat: 12.9716, lng: 77.5946 }, weight: 2 }  // Bangalore
    ];

    // Initialize Google Maps Heatmap
    function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 5,
            center: { lat: 20.5937, lng: 78.9629 }, // India center
            mapTypeId: "roadmap"
        });

        const heatmap = new google.maps.visualization.HeatmapLayer({
            data: corruptionData.map(entry => ({
                location: new google.maps.LatLng(entry.location.lat, entry.location.lng),
                weight: entry.weight
            })),
            radius: 40,
            opacity: 0.6
        });

        heatmap.setMap(map);
    }

    // Load Map
    window.initMap = initMap;

    // Update Top 5 Corrupt States (Dummy Data)
    const corruptStates = ["Uttar Pradesh", "Bihar", "Maharashtra", "Rajasthan", "West Bengal"];
    const listElement = document.getElementById("corruptStatesList");
    corruptStates.forEach(state => {
        const li = document.createElement("li");
        li.textContent = state;
        listElement.appendChild(li);
    });

    // Data for Chart.js
    const ctx = document.getElementById("corruptionChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Bribery", "Misuse of Funds", "Nepotism"],
            datasets: [{
                label: "Number of Cases",
                data: [120, 90, 75],
                backgroundColor: ["#FF5733", "#FFC300", "#C70039"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

});