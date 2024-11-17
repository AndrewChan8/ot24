const comingSoon = document.querySelector(".coming-soon");
const statsTable = document.querySelector("#statsTable");
const tableBody = document.getElementById("userTableBody");

function percentageColor(score, dataCell){
    const value = parseFloat(score);
    const opacity = Math.round((value * .01) * 100) / 100; 
    console.log(opacity);
    dataCell.style.backgroundColor = `rgba(103, 189, 144, ${opacity})`;
}

function appendUsername(row, username){
    const usernameCell = document.createElement("td");
    const usernameText = document.createTextNode(username);
    usernameCell.appendChild(usernameText);
    usernameCell.classList.add("rowHeader");  
    row.appendChild(usernameCell);
}

function loadPercentageData(stats) {
    statsTable.style.display = "block";
    comingSoon.style.display = "none";
    tableBody.innerHTML = "";
    for(let userData in stats){
        const row = document.createElement("tr");
        appendUsername(row, userData);
        for(const percent in stats[userData]){
            let score = stats[userData][percent];
            const dataCell = document.createElement("td");
            const dataText = document.createTextNode(`${score}%`);
            dataCell.appendChild(dataText);
            dataCell.classList.add("bodyData");

            percentageColor(score, dataCell);
            row.appendChild(dataCell);
        }
        tableBody.appendChild(row);
    }   
}
    
function loadPlacementData(stats){
    statsTable.style.display = "block";
    comingSoon.style.display = "none";
    tableBody.innerHTML = "";
    for(let userData in stats){
        const row = document.createElement("tr");
        appendUsername(row, userData);
        for(const percent in stats[userData]){
            let score = stats[userData][percent];
            const dataCell = document.createElement("td");
            const dataText = document.createTextNode(score);
            dataCell.appendChild(dataText);
            dataCell.classList.add("placementBodyData");
            row.appendChild(dataCell);
        }
        tableBody.appendChild(row);
    }   
}

function getPercentData(activeTab) {
    fetch(`scripts/percentages/${activeTab}.json`)
        .then(response => {
            if(!response.ok) {
                comingSoon.style.display = "block";
                statsTable.style.display = "none";
                return Promise.reject("ERROR");
            }
            console.log(response.json);
            return response.json();
        })
        .then(stats => {
           // make table 
           loadPercentageData(stats);
        })
        .catch(error => {
            console.error("Error Fetching JSON:", error);
        });
}


function getPlacementData(activeTab){
    fetch(`scripts/placementsPerPlayer/${activeTab}.json`)
        .then(response => {
            console.log(response);
            if(!response.ok) {
                comingSoon.style.display = "block";
                statsTable.style.display = "none";
                return Promise.reject("ERROR");
            }
            console.log(response.json);
            return response.json();
        })
        .then(stats => {
           // make table 
           loadPlacementData(stats);
        })
        .catch(error => {
            console.error("Error Fetching JSON:", error);
        });
}