const tabs = document.querySelectorAll('.nav-link');
const switchBtn = document.querySelector("#placementButton");

let isPlacementView = false;

document.addEventListener("DOMContentLoaded", function() {
    const defaultTab = "qualifiersStat";
    getStatData(defaultTab);
    
    tabs.forEach(tab => {
        tab.addEventListener("click", function(event) {
            event.preventDefault();
            const activeTab = tab.getAttribute("data-active");
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
