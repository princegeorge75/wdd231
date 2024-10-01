// Declare a constant variable for the URL of the JSON resource
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

// Select the HTML div element with the id value of "cards"
const cards = document.querySelector('#cards');

// Create an async function to fetch data from the JSON source
async function getProphetData() {
  try {
    const response = await fetch(url); // Fetch data from the URL
    const data = await response.json(); // Convert the response to JSON
    // console.table(data.prophets); // Temporary testing of data response
    displayProphets(data.prophets); // Call displayProphets with the prophets array
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Define a function expression to display the prophets
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements to add to the div.cards element
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let dob = document.createElement('p'); // Date of Birth
    let pob = document.createElement('p'); // Place of Birth

    // Build the h2 content out to show the prophet's full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Build the image portrait by setting all the relevant attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Build Date of Birth and Place of Birth
    dob.textContent = `Date of Birth: ${prophet.birthdate}`;
    pob.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Append the section(card) with the created elements
    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(dob); // Add Date of Birth
    card.appendChild(pob); // Add Place of Birth

    cards.appendChild(card); // Append the card to the cards div
  }); // end of arrow function and forEach loop
}

// Call the function to fetch and display prophet data
getProphetData();
