function loadMappoolData(activeTab) {
    const mappoolContainer = document.querySelector(".modTitle");
    const comingSoon = document.querySelector(".coming-soon");
    
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
            mappoolContainer.style.display = "block";
            comingSoon.style.display = "none";

            const nm = document.getElementById("nmPool");
            const hd = document.getElementById("hdPool");
            const hr = document.getElementById("hrPool");
            const dt = document.getElementById("dtPool");
            const tb = document.getElementById("tbPool");

            let modMapping = { "nm": nm, "hd": hd, "hr": hr, "dt": dt, "tb": tb };
            Object.values(modMapping).forEach(section => section.innerHTML = "");

            for(const maps in mappool) {
                let map = mappool[maps];
                let mod = maps.slice(0, 2);
                console.log(map.beatmap_link);
                const cardWrapper = document.createElement('div');
                cardWrapper.classList.add("cardWrapper");
                let starRating = map.star_rating;
                cardWrapper.innerHTML = `
                    <div id="mappoolCardTop">
                        <div id="mapBannerWrapper">
                            <a href="${map.beatmap_link}" target="_blank" rel="noopener noreferrer">
                                <img id="banner" src="${map.image}" alt="${map.title} Banner">
                                <img id="bannerBorder" src="../assets/images/mappoolCard/bannerBorder.png" alt="Banner Border">
                            </a>
                            <div id="mapIDWrapper">
                                <span class="mapID" data-beatmap-id="${map.beatmap_id}" onclick="copyToClipboard(this)">${map.beatmap_id}</span>
                                <img id="mapIDBackground" src="../assets/images/mappoolCard/mapID.png" alt="Map ID Background">
                            </div>
                        </div>
                        <div id="mapStats">
                            <ul>
                                <li>${parseFloat(starRating).toFixed(2)}<img class="mapIcon" src="../assets/images/mappoolCard/star.svg" alt="Star Icon"></li>
                                <li>${Math.round(map.bpm)}<img class="mapIcon" src="../assets/images/mappoolCard/speed.svg" alt="Speed Icon"></li>
                                <li>${map.length}<img class="mapIcon" src="../assets/images/mappoolCard/timelapse.svg" alt="Time Icon"></li>
                            </ul>
                        </div>
                    </div>
                    <div id="mapCreator">
                        <div id="modWrapper">
                            <span id="mod">${maps}</span>
                            <img id="modBackground" src="../assets/images/mappoolCard/modBackground${mod.toUpperCase()}.png" alt="Mod Background">
                        </div>
                        <div id="mapInfo">
                            <div id="songInfo">
                                <span id="song">${map.title}</span>
                                <span id="artist">${map.artist}</span>
                            </div>
                            <div id="diffLevel">
                                <span id="song">[${map.version}]</span>
                                <span id="artist">Mapset by ${map.mapper}</span>
                            </div>
                        </div>
                    </div>
                    <div id="difficulty">
                        <img id="mapStatHover" src="../assets/images/mappoolCard/mapStatsHover.png">
                        <div id="cs"><p>CS ${map.cs}</p></div>
                        <div id="od"><p>OD ${map.od}</p></div>
                        <div id="ar"><p>AR ${map.ar}</p></div>
                    </div>
                    `;
                
                if (modMapping[mod]) {
                    modMapping[mod].appendChild(cardWrapper);
                }
            }
        })
        .catch(error => {
            console.error("Error Fetching JSON:", error);
        });
}

/*

<div id="customWrapper">
    <img id="customBackground" src="../assets/images/mappoolCard/customMapBackground.png">
    <img id="customIcon" src="../assets/images/mappoolCard/customMapIcon.png">
</div>
*/