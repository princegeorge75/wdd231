const baseURL = "https://princegeorge75.github.io/wdd231/chamber/";
const membersURL = "https://princegeorge75.github.io/wdd231/chamber/members.json";
const docMembers = document.querySelector("#members");

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

const displayMembers = (members) => {
    members.forEach((member, index) => {
        // Create document elements for each card
        const card = document.createElement("section");
        const business = document.createElement("h3");
        const address = document.createElement("address");
        const street = document.createElement("p");
        const csz = document.createElement("p");
        const website = document.createElement("a");
        const phone = document.createElement("a");
        const email = document.createElement("a");
        const logo = document.createElement("img");
        const membership = document.createElement("p");
        const category = document.createElement("p");

        // Set element properties & values
        card.setAttribute("class", "card");
        business.textContent = member.business;
        business.id = `mem-name-${index}`; // Ensure unique ID
        street.textContent = member.address.street;

        let compoundCSZ = `${member.address.city}, ${member.address.state} ${member.address.zip}`;
        csz.textContent = compoundCSZ;

        phone.setAttribute("href", `tel:${member.phone}`);
        phone.textContent = member.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        phone.id = `mem-phone-${index}`; // Ensure unique ID
        
        email.setAttribute("href", `mailto:${member.email}`);
        email.textContent = member.email;
        email.id = `mem-email-${index}`; // Ensure unique ID
        
        website.setAttribute("href", member.website);
        website.textContent = "Go to website";
        website.id = `mem-web-${index}`; // Ensure unique ID

        membership.textContent = `Membership: ${member.membership}`;
        membership.id = `mem-type-${index}`; // Ensure unique ID
        category.textContent = member.category;
        category.id = `mem-category-${index}`; // Ensure unique ID

        // Define logo image attributes
        logo.setAttribute("src", member.logo.url);
        logo.setAttribute("alt", `Logo for ${member.business}`);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute("width", member.logo.width);
        logo.setAttribute("height", member.logo.height);
        logo.id = `mem-logo-${index}`; // Ensure unique ID

        // Append elements to the card
        address.appendChild(street);
        address.appendChild(csz);
        card.appendChild(logo);
        card.appendChild(business);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(email);
        card.appendChild(membership);
        card.appendChild(category);

        // Append the card to the members section
        docMembers.appendChild(card);
    });
}

getMembers();

// Weather API data fetch
const weatherSection = document.querySelector(".weather");
const weatherIcon = document.querySelector('#rsvl-weather-icon');
const currentTemp = document.querySelector('#rsvl-current-temp');
const captionDesc = document.querySelector('figcaption');

// API key, coordinates, and URL for Kampala, Uganda
const apiKey = "80674515317583dcc954747f780f1579"; 
const lat = "0.3163";  
const lon = "32.5822"; 
const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${apiKey}`;

// Fetch weather data from the API
async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data); 
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to display the weather data
function displayResults(data) {
    const temp = Math.round(data.current.temp); 
    const iconSrc = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`; 
    const desc = data.current.weather[0].description; 

    currentTemp.innerHTML = `${temp}&deg;F`;
    weatherIcon.src = iconSrc;
    weatherIcon.alt = desc;
    captionDesc.textContent = desc; 

    for (let i = 1; i <= 3; i++) { 
        const dateData = new Date(data.daily[i].dt * 1000); 
        const formattedDate = dateData.toLocaleDateString('en-US', {
            weekday: 'short', month: 'numeric', day: 'numeric'
        }).replace(',', ''); 
        const forecastIconSrc = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
        const forecastTemp = Math.round(data.daily[i].temp.day);
        const forecastDesc = data.daily[i].weather[0].description; 

        const forecastElement = document.createElement("figure");
        forecastElement.classList.add("forecast");
        forecastElement.innerHTML = `
            <h3>${formattedDate}</h3>
            <img src="${forecastIconSrc}" alt="Weather icon" />
            <span>${forecastTemp}&deg;F</span>
            <figcaption>${forecastDesc}</figcaption>
        `;

        weatherSection.appendChild(forecastElement);
    }
}

// Call the function to fetch weather when the page loads
apiFetch();

// Spotlight for gold and silver members
const spotlight = document.querySelector("#spotlight");

async function getSpotlightMembers() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            displaySpotlight(data.members);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

const displaySpotlight = (members) => {
    const golds = [];
    const silvers = [];

    members.forEach(member => {
        if (member.membership.toLowerCase() === "gold") {
            golds.push(member);
        } else if (member.membership.toLowerCase() === "silver") {
            silvers.push(member);
        }
    });

    const randomGold = golds[Math.floor(Math.random() * golds.length)];
    const gold = document.createElement("div");
    gold.className = "gold";
    gold.innerHTML = `
        <img src="${randomGold.logo.url}" alt="Logo for ${randomGold.business}" loading="lazy" width="${randomGold.logo.width}" height="${randomGold.logo.height}">
        <h3>${randomGold.business}</h3>
        <a href="${randomGold.website}">Go to website</a>
        <p>${randomGold.advertisement}</p>
    `;
    spotlight.appendChild(gold);

    const randomSilver = silvers[Math.floor(Math.random() * silvers.length)];
    const silver = document.createElement("div");
    silver.className = "silver";
    silver.innerHTML = `
        <img src="${randomSilver.logo.url}" alt="Logo for ${randomSilver.business}" loading="lazy" width="${randomSilver.logo.width}" height="${randomSilver.logo.height}">
        <h3>${randomSilver.business}</h3>
        <a href="${randomSilver.website}">Go to website</a>
        <p>${randomSilver.advertisement}</p>
    `;
    spotlight.appendChild(silver);
}

getSpotlightMembers();

// Banner Message for specific days
const banner = document.querySelector("#banner");
const msg = document.querySelector("#bannerMsg");
const closeButton = document.querySelector("#closeBanner");
const theDate = new Date();
const theDay = theDate.getDay();

document.addEventListener('DOMContentLoaded', () => {
    if (theDay === 1 || theDay === 2 || theDay === 3) {
        msg.textContent = "Attend the Kampala Chamber of Commerce Meet and Greet this Wednesday at 7:00 p.m.";
        closeButton.textContent = "❌";
    } else {
        banner.style.display = "none";
    }

    closeButton.addEventListener("click", () => {
        banner.style.display = "none";
    });
});

// Action button event
const button = document.querySelector(".action");
button.addEventListener("click", () => {
    window.location.href = "join.html";
})