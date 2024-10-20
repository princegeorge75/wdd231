const banner = document.querySelector("#banner");
const msg = document.querySelector("#bannerMsg");
const closeButton = document.querySelector("#closeBanner");
const theDate = new Date();
const theDay = theDate.getDay();


document.addEventListener('DOMContentLoaded', () => {

    if (theDay === 1 || theDay === 2 || theDay === 3) {
        msg.textContent = "Attend the Kampala Chamber of Commerce Meet and Greet this Wednesday at 7:00 p.m."
        closeButton.textContent = "❌";
    }
    else {
        banner.style.display = "none";
    }

    closeButton.addEventListener("click", () => {
        banner.style.display = "none";
    })
})