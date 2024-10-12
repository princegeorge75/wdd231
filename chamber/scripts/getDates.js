// Last Modified Date
let modDate = new Date(document.lastModified);
formattedDate = modDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
document.getElementById("lastModified").innerHTML = "Last Modified: " + formattedDate;