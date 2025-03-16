document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reportForm");
    const caseStatusDiv = document.getElementById("caseStatus");
    const caseIDSpan = document.getElementById("caseID");
    const caseProgressSpan = document.getElementById("caseProgress");
    const anonymousCheckbox = document.getElementById("anonymous");
    const emailSection = document.getElementById("emailSection");
    const sendOtpButton = document.getElementById("sendOtp");

    // Toggle email section based on anonymous checkbox
    anonymousCheckbox.addEventListener("change", function () {
        emailSection.classList.toggle("hidden", this.checked);
    });

    // Submit Form & Generate Case ID
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const caseID = "CASE-" + Math.floor(100000 + Math.random() * 900000);
        caseIDSpan.textContent = caseID;
        caseProgressSpan.textContent = "Received";
        
        caseStatusDiv.classList.remove("hidden");

        alert("Your case has been submitted! Case ID: " + caseID);

        form.reset(); // Reset form after submission
        emailSection.classList.add("hidden"); // Hide email section again
    });

    // OTP Simulation
    sendOtpButton.addEventListener("click", function () {
        alert("OTP sent to your email!");
    });
});
