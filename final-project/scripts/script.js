document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to the Kigo Golfing Club!");

    // Get the current URL path
    const currentPath = window.location.pathname.split("/").pop();

    // Select all navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    // Loop through each link
    navLinks.forEach(link => {
        // Check if the link's href matches the current URL path
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active-link'); // Add the active class
        }
    });


    // Update the footer with the last modified date
    document.getElementById("lastModified").textContent = document.lastModified;
    
    // activate the hamburger button

    const hamButton = document.querySelector("#hamburger");
    const ul = document.querySelector("ul");
    
    hamButton.addEventListener("click", () => {
        ul.classList.toggle("open-ul");
        hamButton.classList.toggle("open");
    });

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

async function fetchMembers() {
    try {
        const response = await fetch('members.json'); // Fetch the local JSON file
        const members = await response.json(); // Convert response to JSON

        displayMembers(members); // Call function to display members
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayMembers(members) {
    const container = document.getElementById('members-container');
    container.innerHTML = ''; // Clear previous content

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';

        // Create membership image source based on subscription
        let membershipImage = '';
        if (member.membership === 'Gold') {
            membershipImage = 'images/gold.jpg'; // Path to gold image
        } else if (member.membership === 'Silver') {
            membershipImage = 'images/silver.jpg'; // Path to silver image
        } else if (member.membership === 'Bronze') {
            membershipImage = 'images/bronze.jpg'; // Path to bronze image
        }

        // Add content to the card
        card.innerHTML = `
            <img src="${membershipImage}" alt="${member.name} Membership">
            <h3>${member.name}</h3>
            <p>Membership: ${member.membership}</p>
        `;

        container.appendChild(card); // Add the card to the container
    });
}

// Call the fetch function to load members on page load
fetchMembers();
