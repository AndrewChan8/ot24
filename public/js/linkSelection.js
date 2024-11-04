// Function to set the initial active link based on the body ID
function setInitialActiveLink() {
    const links = document.querySelectorAll("#navlinks a");
    const bodyId = document.body.id;
    
    links.forEach(link => {
        if (link.dataset.active === bodyId) {
            link.classList.add("active");
        }
    });
}

// Function to handle click events and manage active class on nav links
function setupNavLinkListeners() {
    document.querySelectorAll("#mappoolLinks .nav-link").forEach(link => {
        link.addEventListener("click", function() {
            document.querySelector("#mappoolLinks .nav-link.active")?.classList.remove("active");
            link.classList.add("active");
        });
    });
}

// Initialize
setInitialActiveLink();
setupNavLinkListeners();
