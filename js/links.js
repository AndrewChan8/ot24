// Correct selector to target all anchor tags within the #navlinks element
let links = document.querySelectorAll("#navlinks a");
console.log(links); // Logs the NodeList of all <a> elements inside #navlinks

let bodyId = document.querySelector("body").id; // Get the ID of the <body>

// Loop through each link and check if its data-active attribute matches the body ID
for (let link of links) {
    if (link.dataset.active === bodyId) {
        link.classList.add("active"); // Add the active class to the matching link
    }
}
