document.addEventListener("DOMContentLoaded", function () {
    fetchOffices();
    loadOfficeDropdown();
});

let officeData = [];
let selectedRating = 0;

function fetchOffices() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            officeData = data;
            displayOffices(officeData);
        })
        .catch(error => console.error("Error loading data:", error));
}

function loadOfficeDropdown() {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let dropdown = document.getElementById("review-office");
            data.forEach(office => {
                let option = document.createElement("option");
                option.value = office.name;
                option.textContent = office.name;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading offices:", error));
}

function displayOffices(offices) {
    const officeList = document.getElementById("office-list");
    officeList.innerHTML = "";

    offices.forEach(office => {
        const officeDiv = document.createElement("div");
        officeDiv.classList.add("office-card");

        officeDiv.innerHTML = `
            <h3>${office.name}</h3>
            <p>Category: ${office.category}</p>
            <p>Location: ${office.location}</p>
            <p>Rating: ⭐ ${office.rating.toFixed(1)}</p>
            <p>Complaints: ${office.complaints}</p>
        `;

        officeList.appendChild(officeDiv);
    });
}

function setRating(rating) {
    selectedRating = rating;
    let stars = document.querySelectorAll(".rating span");
    stars.forEach((star, index) => {
        star.classList.toggle("selected", index < rating);
    });
}

function addReview() {
    let officeName = document.getElementById("review-office").value;
    let comment = document.getElementById("review-comment").value;
    let message = document.getElementById("review-message");

    if (!officeName || !comment || selectedRating === 0) {
        message.style.color = "red";
        message.textContent = "⚠️ Please select an office, add a comment, and rate!";
        return;
    }

    let office = officeData.find(o => o.name === officeName);
    if (!office) {
        message.style.color = "red";
        message.textContent = "❌ Office not found!";
        return;
    }

    if (comment.length < 5) {
        message.style.color = "red";
        message.textContent = "⚠️ Review must be at least 5 characters long.";
        return;
    }

    // Basic Fake Review Detection (Prevent Spam)
    if (comment.toLowerCase().includes("fake") || comment.length > 200) {
        message.style.color = "red";
        message.textContent = "🚨 Fake or spam review detected!";
        return;
    }

    // Update Office Rating
    office.rating = ((office.rating + selectedRating) / 2).toFixed(1);
    displayOffices(officeData);

    // Reset Form
    document.getElementById("review-office").value = "";
    document.getElementById("review-comment").value = "";
    selectedRating = 0;
    let stars = document.querySelectorAll(".rating span");
    stars.forEach(star => star.classList.remove("selected"));

    message.style.color = "green";
    message.textContent = "✅ Review added successfully!";
}
