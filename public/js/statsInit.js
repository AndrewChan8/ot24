const tabs = document.querySelectorAll('.nav-link');
const switchBtn = document.querySelector("#placementButton");

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
    tabs.forEach(tab => {
        const activeTab = tab.getAttribute("data-active");
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        loadPlacementData(activeTab);
    })
})
