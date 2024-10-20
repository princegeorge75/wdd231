// target the document location for the visits
const visits = document.querySelector(".visits");

// get VALUE for the "numVisits-Is" KEY if it exists. If missing, assign 0 to numVisits variable
let numVisits = Number(window.localStorage.getItem("numVisits-Is")) || 0;

// value of a day in milliseconds (1000 ms/s * 60s/m * 60 m/hr * 24 h/day)
let msOfOneDay = 1000 * 60 * 60 * 24;  // 86,400,000 is value of 1 day in ms
let timeNow = Date.now();  // in milliseconds

if (numVisits !== 0) {
    let lastVisited = Number(window.localStorage.getItem("lastVisited-Is"));
    
    if (timeNow - lastVisited < msOfOneDay) {
        visits.textContent = "Back so soon! Awesome!";
    } else {
        let daysAgo = Math.floor((timeNow - lastVisited) / msOfOneDay);
        let lastVisitText = `You last visited ${daysAgo} days ago.`;
        visits.textContent = lastVisitText;
    }
} else {
    visits.textContent = "Welcome! Let us know if you have any questions.";
}

// add to the number of visits to be stored
numVisits++;

// set the new VALUE of the local storage, create if not there
localStorage.setItem("numVisits-Is", numVisits);
localStorage.setItem("lastVisited-Is", timeNow);
