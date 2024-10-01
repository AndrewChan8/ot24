fetch("../scripts/mappools/qf.json")
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! Status ${response.status}`)
        }
        return response.json();
    })
    .then(mappool => {
        // console.log(mappool);
        const mappoolCardContainer = document.getElementById("mappoolCardContainer");
        const nm = document.getElementById("nm");
        const hd= document.getElementById("hd");
        const hr = document.getElementById("hr");
        const dt = document.getElementById("dt");
        const fm = document.getElementById("fm");
        const tb = document.getElementById("tb");


        for(const maps in mappool) {
            let map = mappool[maps];
            // console.log(mappool[maps].beatmap_id)
            // console.log(maps);
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
                            <li>${map.star_rating}<img class="mapIcon" src="../assets/images/mappoolCard/star.png" alt="Star Icon"></li> 
                            <li>${map.bpm}<img class="mapIcon" src="../assets/images/mappoolCard/speed.png" alt="Speed Icon"></li>
                            <li>${map.length}<img class="mapIcon" src="../assets/images/mappoolCard/timeLapse.png" alt="Time Icon"></li>
                        </ul>
                    </div>
                </div>
                <div id="mapCreator">
                    <div id="modWrapper">
                        <span id="mod">${maps}</span>
                        <img id="modBackground" src="../assets/images/mappoolCard/modBackgroundHR.png" alt="Mod Background">
                    </div>
                    <div id="songInfo">
                        <span id="song">${map.title}</span>
                        <span id="artist">${map.artist}</span>
                    </div>
                </div>
            `;
            let mod = maps.slice(0, 2)
            if (mod == "nm") {
                nm.appendChild(cardWrapper);
            } else if (mod == "hd") {
                hd.appendChild(cardWrapper);
            } else if(most == "hr") {
                hr.appendChild(cardWrapper);
            } else if(mod == "dt") {
                dt.appendChild(cardWrapper);
            } else if(most == "fm") {
                fm.appendChild(cardWrapper);
            }
        }
    })
    .catch(error => {
        console.error("Error Fetching JSON:", error);
    });

