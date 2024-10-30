document.addEventListener("DOMContentLoaded", function() {
    const defaultTab = "qualifiers";
    loadMappoolData(defaultTab);
    const tabs = document.querySelectorAll('.nav-link');

    tabs.forEach(tab => {
        tab.addEventListener("click", function(event) {
            event.preventDefault();
            
            // Get the active tab's data identifier
            const activeTab = tab.getAttribute("data-active");
            if (tab.classList.contains("active")) {
                return; 
            }

            // Remove active class from other tabs and add to the clicked one
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // Fetch and display the JSON data for the selected tab
            loadMappoolData(activeTab);
        });
    });
});

function loadMappoolData(activeTab) {
    const mappoolContainer = document.querySelector(".modTitle");
    const comingSoon = document.querySelector(".coming-soon");
    console.log(mappoolContainer, comingSoon);
    
    console.log(activeTab);
    fetch(`../scripts/mappools/${activeTab}.json`)
        .then(response => {
            if(!response.ok) {
                comingSoon.style.display = "block";
                mappoolContainer.style.display = "none";
                return Promise.reject("ERROR");
            }
            return response.json();
        })
        .then(mappool => {
            console.log(mappool);
            mappoolContainer.style.display = "block";
            comingSoon.style.display = "none";
            const nm = document.getElementById("nmPool");
            const hd= document.getElementById("hdPool");
            const hr = document.getElementById("hrPool");
            const dt = document.getElementById("dtPool");
            const tb = document.getElementById("tbPool");

            let modMapping = {
                "nm": nm,
                "hd": hd,
                "hr": hr,
                "dt": dt,
                "tb": tb
            }
            
            Object.values(modMapping).forEach(section => section.innerHTML = "");

            for(const maps in mappool) {
                let map = mappool[maps];
                let mod = maps.slice(0, 2) 
                console.log(mod);    
                const cardWrapper = document.createElement('div');
                cardWrapper.classList.add("cardWrapper");
                cardWrapper.innerHTML = `
                <div id="mappoolCardTop">
                        <div id="mapBannerWrapper">
                            <img id="banner" src="../assets/images/mappoolCard/mappoolBanner.png" alt="${map.title} Banner">
                            <img id="bannerBorder" src="../assets/images/mappoolCard/bannerBorder.png" alt="Banner Border">
                            <div id="mapIDWrapper">
                                <span id="mapID">${map.beatmap_id}</span>
                                <img id="mapIDBackground" src="../assets/images/mappoolCard/mapID.png" alt="Map ID Background">
                                </div>
                        </div>
                        <div id="mapStats">
                            <ul>
                            <li>${map.star_rating}<img class="mapIcon" src="../assets/images/mappoolCard/star.svg" alt="Star Icon"></li> 
                            <li>${map.bpm}<img class="mapIcon" src="../assets/images/mappoolCard/speed.svg" alt="Speed Icon"></li>
                            <li>${map.length}<img class="mapIcon" src="../assets/images/mappoolCard/timelapse.svg" alt="Time Icon"></li>
                            </ul>
                        </div>
                        </div>
                        <div id="mapCreator">
                        <div id="modWrapper">
                            <span id="mod">${maps}</span>
                            <img id="modBackground" src="../assets/images/mappoolCard/modBackground${mod.toUpperCase()}.png" alt="Mod Background">
                            </div>
                            <div id="songInfo">
                            <span id="song">${map.title}</span>
                            <span id="artist">${map.artist}</span>
                            </div>
                            </div>
                            `;                
                console.log(modMapping)
                if (modMapping[mod]) {
                    console.log("++++++++++++++++")
                    modMapping[mod].appendChild(cardWrapper);
                    console.log(`Appended ${mod} map: ${map.title}`);
                } else {
                    console.warn(`No mapping for mod: ${mod} - cannot append map: ${map.title}`);
                }
            }
        })
        .catch(error => {
            console.error("Error Fetching JSON:", error);
        });
}
