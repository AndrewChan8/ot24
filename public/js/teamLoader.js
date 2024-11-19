const teamIcon = [
    "miku",
    "miku",
    "ForcedHD2",
    "miku",
    "MainsDads",
    "SnowWhirled",
    "MonogatariGif",
    "HorseFish"
]

function loadTeams(teams){
    const teamContainer = document.getElementById("teamContainer");
    let counter = 1;
    let imgCounter = 0;
    
    for(let team in teams){
        const teamCard = document.createElement('div');
        teamCard.classList.add("teamCard"); 

        const teamProfile = document.createElement('div');
        teamProfile.classList.add("teamProfile");
        
        const teamInfo = document.createElement("div");
        teamInfo.classList.add("teamInfo");

        const seed = document.createElement("p");
        const seedbg = document.createElement("img");
        const teamPhoto = document.createElement("img");
        const teamPhotoBorder = document.createElement("img");

        seed.textContent = `Seed ${counter}`;
        counter++;
        seedbg.src = "assets/images/mappoolCard/mapID.png";
    
        teamPhoto.src = `assets/images/teamIcons/${teamIcon[imgCounter]}.png`;
        imgCounter++;
        teamPhotoBorder.src = "assets/images/teamborder.png";

        seedbg.classList.add("seedBackground");
        teamPhoto.classList.add("teamPhoto");
        teamPhotoBorder.classList.add("teamPhotoBorder");

        teamProfile.append(seed);
        teamProfile.append(seedbg);
        teamProfile.append(teamPhoto);
        teamProfile.append(teamPhotoBorder);

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        const headerRow = document.createElement("tr");
        const headerCell = document.createElement("th");
        headerCell.setAttribute("colspan", "2");

        headerCell.textContent = team;
        headerCell.classList.add("teamName");
        headerRow.appendChild(headerCell);
        thead.appendChild(headerRow);

        table.appendChild(thead);

        Object.keys(teams[team]).forEach(players => {
            const player = teams[team][players];
            const row = document.createElement("tr");

            const playerName = document.createElement("a");
            playerName.href = `https://osu.ppy.sh/users/${player[2]}`;
            playerName.target = "_blank";
            playerName.classList.add("playerName");
            playerName.textContent = player[0];

            const playerRank = document.createElement("td");
            playerName.classList.add("playerRank");
            playerRank.textContent = `#${player[1]}`;

            row.appendChild(playerName);
            row.appendChild(playerRank);

            tbody.append(row);
        });
        table.appendChild(tbody);

        teamInfo.appendChild(table);

        teamCard.appendChild(teamProfile);
        teamCard.appendChild(teamInfo);

        teamContainer.appendChild(teamCard);
    }
}

function getTeams(){
    fetch(`scripts/teams/teams.json`)
    .then(response => {
        if(!response.ok) {
            return Promise.reject("ERROR");
        }
        return response.json();
    })
    .then(teams => {
       // make table 
       loadTeams(teams);
    })
    .catch(error => {
        console.error("Error Fetching JSON:", error);
    });
}

getTeams();