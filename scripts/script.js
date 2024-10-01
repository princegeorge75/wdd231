// Toggle the navigation menu for small screens
document.getElementById('hamburger').addEventListener('click', function () {
document.querySelector('#animate_me').classList.toggle('open');

hamburgerElement.addEventListener('click', () =>{
    navElement.classList.toggle("open");
    hamburgerElement.classList.toggle("open")
})
});

// Set the current year in the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Display the last modified date in the footer
document.getElementById('lastModified').textContent += document.lastModified;

// Filter Course Cards Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

// Event listener for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        courseCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block'; // Show all cards
            } else {
                card.classList.contains(filter) 
                    ? card.style.display = 'block' // Show filtered cards
                    : card.style.display = 'none'; // Hide others
            }
        });
    });
});
