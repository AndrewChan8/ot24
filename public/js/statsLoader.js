
function loadStatData(activeTab) {
    const StatContainer = document.querySelector("#userTableBody");
    const comingSoon = document.querySelector(".coming-soon");
    
    fetch(`scripts/stats/${activeTab}.json`)
        .then(response => {
            console.log(response);
            if(!response.ok) {
                comingSoon.style.display = "block";
                StatContainer.style.display = "none";
                return Promise.reject("ERROR");
            }
            console.log(response.json);
            return response.json();
        })
        .then(stats => {
           // make table here
           const tableBody = document.getElementById("userTableBody");
           stats.forEach((user) => {
                console.log(user);
                const row = document.createElement("tr");
                for(let score in user){
                    const dataCell = document.createElement("td");
                    const dataText = document.createTextNode(user[score]);
                    dataCell.appendChild(dataText);
                    console.log(dataCell);
                    row.appendChild(dataCell);
                }
                tableBody.appendChild(row);
           })
           
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