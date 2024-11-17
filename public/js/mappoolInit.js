document.addEventListener("DOMContentLoaded", function() {
    const defaultTab = "mappools/qualifiers";
    loadMappoolData(defaultTab);

    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
        tab.addEventListener("click", function(event) {
            event.preventDefault();
            const activeTab = tab.getAttribute("data-active");
        
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            loadMappoolData(activeTab);
            console.log(activeTab);
        });
    });
});
