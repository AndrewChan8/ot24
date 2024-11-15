
function loadStatData(activeTab) {
    const StatContainer = document.querySelector("#userTableBody");
    const comingSoon = document.querySelector(".coming-soon");
    const statsTable = document.querySelector("#statsTable");
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
           // make table here
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
                    } else {
                        dataCell.classList.add("bodyData");
                        const percentageValue = parseFloat(user[score]);
                        if (percentageValue <= 100 && percentageValue >= 70){
                            dataCell.style.backgroundColor = "#50a77a";
                        } else if(percentageValue <= 70 && percentageValue >= 60){
                            dataCell.style.backgroundColor = "red";
                        }
                    }


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