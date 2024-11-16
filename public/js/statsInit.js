const tabs = document.querySelectorAll('.nav-link');
const switchBtn = document.querySelector("#placementButton");
let tournamentTitle = document.querySelector("#header");

let isPlacementView = false;

document.addEventListener("DOMContentLoaded", function() {
    const defaultTab = "qualifiers";
    getPlacementData(defaultTab);
    
    tabs.forEach(tab => {
        tab.addEventListener("click", function(event) {
            event.preventDefault();
            const activeTab = tab.getAttribute("data-active");
            updateTournamentTitle(activeTab);
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            getPlacementData(activeTab);
        });
    });
});

switchBtn.addEventListener("click", function() {
    console.log("button clicked");
    const activeTab = document.querySelector('.nav-link.active').getAttribute("data-active");

    isPlacementView = !isPlacementView; // Toggle view state
    if (isPlacementView) {
        switchBtn.textContent = "Placement";
        getPercentData(activeTab);
    } else {
        switchBtn.textContent = "MAX%"
        getPlacementData(activeTab);
    }
})

function updateTournamentTitle(activeTab) {
    let title = "";
    console.log(activeTab);
    switch (activeTab) {
        case "qualifiers":
            title = "Qualifiers Results";
            break;
        case "quarterFinals":
            title = "Quarterfinals Results";
            break;
        case "semifinals":
            title = "Semifinals Results";
            break;
        case "finals":
            title = "Finals Results";
            break;
        case "grandFinals":
            title = "Grandfinals Results";
            break;
    }

    // Set the new title to the tournamentTitle element
    tournamentTitle.textContent = title;
}
