const baseURL = "https://princegeorge75.github.io/wdd231/chamber/";
const membersURL = "https://princegeorge75.github.io/wdd231/chamber/members.json";
const docMembers = document.querySelector("#members");

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
    members.forEach(member => {
        // create document elements for each card
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

        // set element properties & values
        card.setAttribute("class", "card");
        business.textContent = member.business;
        business.id = "mem-name";
        address.id = "mem-address";
        street.textContent = member.address.street;
        
        // Fixing string interpolation and escaping for compoundCSZ
        let compoundCSZ = `${member.address.city}, ${member.address.state} ${member.address.zip}`;
        csz.textContent = compoundCSZ;

        // Fixing the href attribute for phone and email
        phone.setAttribute("href", `tel:${member.phone}`);
        phone.textContent = member.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        phone.id = "mem-phone";
        
        email.setAttribute("href", `mailto:${member.email}`);
        email.textContent = member.email;
        email.id = "mem-email";
        
        website.setAttribute("href", member.website);
        website.textContent = "Go to website";
        website.id = "mem-web";

        // Fixing string interpolation for membership and category
        membership.textContent = `Membership: ${member.membership}`;
        membership.id = "mem-type";
        category.textContent = member.category; // No need for interpolation here
        category.id = "mem-category";

        // define logo image attributes
        logo.setAttribute("src", member.logo.url);
        logo.setAttribute("alt", `Logo for ${member.business}`); // Fixing interpolation for alt text
        logo.setAttribute("loading", "lazy");
        logo.setAttribute("width", member.logo.width);
        logo.setAttribute("height", member.logo.height);
        logo.id = "mem-logo";

        // append elements to the document
        address.appendChild(street);
        address.appendChild(csz);

        card.appendChild(logo);         // #mem-logo
        card.appendChild(business);     // #mem-name
        card.appendChild(address);      // #mem-address
        card.appendChild(phone);        // #mem-phone
        card.appendChild(website);      // #mem-web
        card.appendChild(email);        // #mem-email
        card.appendChild(membership);   // #mem-type
        card.appendChild(category);     // #mem-category

        docMembers.appendChild(card);   // .card
    });
}

getMembers();

// grid vs list functionality
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => {
    docMembers.classList.add("grid");
    docMembers.classList.remove("list");
});

listButton.addEventListener("click", () => {
    docMembers.classList.add("list");
    docMembers.classList.remove("grid");
});
