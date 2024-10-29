document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to the Kigo Golfing Club!");

    // Update the footer with the last modified date
 document.getElementById("lastModified").textContent = document.lastModified;


    // Mobile Menu Toggle (for small screens)
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("nav ul");

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }

    // Form Validation
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (event) => {
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();

            if (name === "" || email === "") {
                alert("Please complete all fields before submitting.");
                event.preventDefault();  // Prevent form from submitting
            } else {
                alert("Form successfully submitted! Thank you.");
            }
        });
    }
});
