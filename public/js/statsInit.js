document.addEventListener("DOMContentLoaded", function() {
    const defaultTab = "qualifiersStat";
    const switchBtn = document.querySelector("#placementButton");
    loadStatData(defaultTab);
    
    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
        tab.addEventListener("click", function(event) {
            event.preventDefault();
            const activeTab = tab.getAttribute("data-active");
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            loadStatData(activeTab);
        });
    });

    switchBtn.addEventListener("click", function(event) {
        tabs.forEach(tab => {
            event.preventDefault();
            const activeTab = tab.getAttribute("data-active");
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            console.log("Button clicked")
        })
    })
});
