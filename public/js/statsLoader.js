const comingSoon = document.querySelector(".coming-soon");
const statsTable = document.querySelector("#statsTable");
function percentageColor(value, dataCell){
    const opacity = Math.round((value * .01) * 100) / 100; 
    dataCell.style.backgroundColor = `rgba(103, 189, 144, ${opacity})`;
}

function loadPercentageData(stats) {
    statsTable.style.display = "block";
    comingSoon.style.display = "none";
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";
    stats.forEach((user) => {
         console.log(user);
         const row = document.createElement("tr");
         for(let score in user){
             const dataCell = document.createElement("td");
             const dataText = document.createTextNode(user[score]);

             dataCell.appendChild(dataText);
             if(score == "username"){
                 dataCell.classList.add("rowHeader");
             } else if(score == "seed"){
                dataCell.classList.add("colSeed");
             }
             else {
                 dataCell.classList.add("bodyData");
                 const percentageValue = parseFloat(user[score]);
                 percentageColor(percentageValue, dataCell);
             }
             row.appendChild(dataCell);
         }
         tableBody.appendChild(row);
    })
}
    
function loadPlacementData(){
    statsTable.style.display = "block";
    comingSoon.style.display = "none";
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";
    stats.forEach((user) => {
         console.log(user);
         const row = document.createElement("tr");
         for(let score in user){
             const dataCell = document.createElement("td");
             const dataText = document.createTextNode(1);

             dataCell.appendChild(dataText);
             if(score == "username"){
                 dataCell.classList.add("rowHeader");
             } else {
                 dataCell.classList.add("bodyData");
                 const percentageValue = parseFloat(user[score]);
                 percentageColor(percentageValue, dataCell);
             }
             row.appendChild(dataCell);
         }
         tableBody.appendChild(row);
    })
}

function getStatData(activeTab) {
    fetch(`scripts/stats/${activeTab}.json`)
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
           loadPercentageData(stats);
        })
        .catch(error => {
            console.error("Error Fetching JSON:", error);
        });
}


function getPlacementData(activeTab){
    console.log(activeTab);
    fetch(`scripts/stats/${activeTab}`)
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
            loadPlacementData(stats);
        })
        .catch(error => {
            console.log("Error Fetching JSON", error);
        })
}