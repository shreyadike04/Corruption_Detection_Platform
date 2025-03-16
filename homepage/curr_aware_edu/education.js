// Toggle Accordion Sections
document.querySelectorAll(".accordion-btn").forEach(button => {
    button.addEventListener("click", function () {
        let content = this.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
});

// Toggle FAQ Sections
document.querySelectorAll(".faq-btn").forEach(button => {
    button.addEventListener("click", function () {
        let content = this.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
});

// Alert on Report Corruption Button Click
function reportCorruption() {
    alert("Redirecting to the corruption reporting page...");
    window.open("https://www.cvc.gov.in/", "_blank");
}