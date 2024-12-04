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
            console.log(activeTab);
            updateTournamentTitle(activeTab);
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            getPlacementData(activeTab);
        });
    });
});

switchBtn.addEventListener("click", function() {
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
    let sheetLink = "#";
    console.log(activeTab);
    switch (activeTab) {
        case "qualifiers":
            title = "Qualifiers Results";
            sheetLink = "#";
            break;
        case "quarterFinals":
            title = "Quarterfinals Stats Sheet";
            sheetLink = "https://docs.google.com/spreadsheets/d/1_h45JqbnJKA3uWHueKBTzadfu27KN_J-9ciF25FwhLE/edit?usp=sharing"
            break;
        case "semifinals":
            title = "Semifinals Stats Sheet";
            sheetLink = "https://docs.google.com/spreadsheets/d/1QlxLJyHsESJsrmV-b1Ti_ywHIw0lmrORhd1oYfpeFnU/edit?usp=sharing"
            break;
        case "finals":
            title = "Finals Stats Sheet";
            sheetLink = "#";
            break;
        case "grandFinals":
            title = "Grandfinals Stats Sheet";
            sheetLink = "#";
            break;
    }

    // Set the new title to the tournamentTitle element
    tournamentTitle.textContent = title;
    tournamentTitle.href = sheetLink;
}
