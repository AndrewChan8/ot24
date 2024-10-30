// Correct selector to target all anchor tags within the #navlinks element
let links = document.querySelectorAll("#navlinks a");
let bodyId = document.querySelector("body").id; // Get the ID of the <body>

// Loop through each link and check if its data-active attribute matches the body ID
for (let link of links) {
    if (link.dataset.active === bodyId) {
        link.classList.add("active"); // Add the active class to the matching link
    }
}


document.querySelectorAll("#mappoolLinks .nav-link").forEach(link => {
    link.addEventListener("click", function() {
        // Remove 'active' class from any currently active link
        document.querySelector("#mappoolLinks .nav-link.active")?.classList.remove("active");

        // Add 'active' class to the clicked link
        link.classList.add("active");
    });
});

let tests=document.querySelectorAll("#mappoolLinks .nav-link");
console.log(tests);