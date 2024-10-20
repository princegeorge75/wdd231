const baseURL = "https://princegeorge75.github.io/wdd231/chamber/";
const membersURL = "https://princegeorge75.github.io/wdd231/chamber/members.json";
const spotlight = document.querySelector(".spotlight");

async function getMembers() {
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
    // create elements for document
    const gold = document.createElement("div");
    const silver = document.createElement("div");

    // set class attributes for the document elements
    gold.className = "gold";
    silver.className = "silver";

    // create lists for valid members based on type
    const golds = [];
    const silvers = [];

    members.forEach(member => {
        if (member.membership.toLowerCase() === "gold") {
            golds.push(member);
        } else if (member.membership.toLowerCase() === "silver") {
            silvers.push(member);
        }
    });

    // POPULATE FOR GOLD MEMBERS
    // pull a random index number with the correct criteria
    const randomGold = golds[Math.floor(Math.random() * golds.length)];

    // create document elements for each card
    const goldBus = document.createElement("h3");
    const goldLogo = document.createElement("img");
    const goldWeb = document.createElement("a");
    const goldAdv = document.createElement("p");

    // set element properties & values
    goldBus.textContent = randomGold.business;
    goldWeb.setAttribute("href", randomGold.website);
    goldWeb.textContent = "Go to website";
    goldAdv.textContent = randomGold.advertisement;

    // define logo image attributes
    goldLogo.setAttribute("src", randomGold.logo.url);
    goldLogo.setAttribute("alt", `Logo for ${randomGold.business}`);
    goldLogo.setAttribute("loading", "lazy");
    goldLogo.setAttribute("width", randomGold.logo.width);
    goldLogo.setAttribute("height", randomGold.logo.height);

    // append elements to the document
    gold.appendChild(goldLogo);     // .gold img
    gold.appendChild(goldBus);      // .gold h3
    gold.appendChild(goldWeb);      // .gold a
    gold.appendChild(goldAdv);      // .gold p

    spotlight.appendChild(gold);    // .gold

    // POPULATE FOR SILVER MEMBERS
    // pull a random index number with the correct criteria
    const randomSilver = silvers[Math.floor(Math.random() * silvers.length)];

    // create document elements for each card
    const silverBus = document.createElement("h3");
    const silverLogo = document.createElement("img");
    const silverWeb = document.createElement("a");
    const silverAdv = document.createElement("p");

    // set element properties & values
    silverBus.textContent = randomSilver.business;
    silverWeb.setAttribute("href", randomSilver.website);
    silverWeb.textContent = "Go to website";
    silverAdv.textContent = randomSilver.advertisement;

    // define logo image attributes
    silverLogo.setAttribute("src", randomSilver.logo.url);
    silverLogo.setAttribute("alt", `Logo for ${randomSilver.business}`);
    silverLogo.setAttribute("loading", "lazy");
    silverLogo.setAttribute("width", randomSilver.logo.width);
    silverLogo.setAttribute("height", randomSilver.logo.height);

    // append elements to the document
    silver.appendChild(silverLogo);     // .silver img
    silver.appendChild(silverBus);      // .silver h3
    silver.appendChild(silverWeb);      // .silver a
    silver.appendChild(silverAdv);      // .silver p

    spotlight.appendChild(silver);      // .silver
}

getMembers();
