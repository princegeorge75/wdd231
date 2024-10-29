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

// Fetch the member data from the JSON file
async function fetchMembers() {
    try {
        const response = await fetch("final-project/members.json"); // Replace with actual path
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

// Display members on the page
function displayMembers(members) {
    const memberContainer = document.getElementById("member-container");
    memberContainer.innerHTML = ""; // Clear any existing content

    members.forEach((member, index) => {
        // Create the HTML for each member card
        const memberCard = document.createElement("div");
        memberCard.classList.add("member-card");
        memberCard.innerHTML = `
            <h3>${member.name}</h3>
            <p>Package: ${member.membership}</p>
            <button onclick="showMemberModal(${index})">More Info</button>
        `;

        memberContainer.appendChild(memberCard);
    });

    // Save member data to localStorage
    localStorage.setItem("members", JSON.stringify(members));
}

// Show modal dialog with detailed member information
function showMemberModal(index) {
    const members = JSON.parse(localStorage.getItem("members"));
    const member = members[index];
    const modal = document.getElementById("member-modal");

    modal.innerHTML = `
        <div class="modal-content">
            <h2>${member.name}</h2>
            <p>Package: ${member.membership}</p>
            <p>Email: ${member.email}</p>
            <p>Phone: ${member.phone}</p>
            <button onclick="closeModal()">Close</button>
        </div>
    `;

    modal.style.display = "block";
}

// Close the modal
function closeModal() {
    document.getElementById("member-modal").style.display = "none";
}

// Initialize the members list on page load
document.addEventListener("DOMContentLoaded", fetchMembers);
