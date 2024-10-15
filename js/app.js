fetch("../scripts/mappools/qf.json")
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! Status ${response.status}`)
        }
        return response.json();
    })
    .then(mappool => {
        // console.log(mappool);
        const mapIDElement = document.getElementById("mapID");
        console.log(mapIDElement)
        const nm = document.getElementById("nmPool");
        const hd= document.getElementById("hdPool");
        const hr = document.getElementById("hrPool");
        const dt = document.getElementById("dtPool");
        const fm = document.getElementById("fmPool");
        const tb = document.getElementById("tbPool");

        const modMapping = {
            "nm": nm,
            "hd": hd,
            "hr": hr,
            "dt": dt,
            "fm": fm,
            "tb": tb
        }

        for(const maps in mappool) {
            let map = mappool[maps];
            // console.log(mappool[maps].beatmap_id)
            // console.log(maps);
            let mod = maps.slice(0, 2)     
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
                        <img id="modBackground" src="../assets/images/mappoolCard/modBackground${mod}.png" alt="Mod Background">
                    </div>
                    <div id="songInfo">
                        <span id="song">${map.title}</span>
                        <span id="artist">${map.artist}</span>
                    </div>
                </div>
            `;
    
            
            if (modMapping[mod]) {
        console.log(mapIDElement)

                if (map.beatmap_id.lenght < 7) {
                    mapIDElement.style.letterSpacing = "0.3em";
                }
                modMapping[mod].appendChild(cardWrapper);

            }
        }
    })
    .catch(error => {
        console.error("Error Fetching JSON:", error);
    });

