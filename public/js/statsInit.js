const tabs = document.querySelectorAll('.nav-link');
const switchBtn = document.querySelector("#placementButton");
let tournamentTitle = document.querySelector("#header");

let isPlacementView = false;

document.addEventListener("DOMContentLoaded", function() {
    const defaultTab = "qualifiersStat";
    getStatData(defaultTab);
    
    tabs.forEach(tab => {
        tab.addEventListener("click", function(event) {
            event.preventDefault();
            const activeTab = tab.getAttribute("data-active");
            updateTournamentTitle(activeTab);
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            getStatData(activeTab);
        });
    });
});

switchBtn.addEventListener("click", function() {
    const activeTab = document.querySelector('.nav-link.active').getAttribute("data-active");

    isPlacementView = !isPlacementView; // Toggle view state
    if (isPlacementView) {
        switchBtn.textContent = "MAX%"
        loadPlacementData(activeTab);
    } else {
        switchBtn.textContent = "Placement";
        getStatData(activeTab);
    }
})

function updateTournamentTitle(activeTab) {
    let title = "";
    console.log(activeTab);
    switch (activeTab) {
        case "qualifiersStat":
            title = "Qualifiers Results";
            break;
        case "quarterFinalsStat":
            title = "Quarterfinals Results";
            break;
        case "semifinalsStat":
            title = "Semifinals Results";
            break;
        case "finalsStat":
            title = "Finals Results";
            break;
        case "grandFinalsStat":
            title = "Grandfinals Results";
            break;
    }

    // Set the new title to the tournamentTitle element
    tournamentTitle.textContent = title;
}
