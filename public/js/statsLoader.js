function percentageColor(score, dataCell){
    if(score >= 70 && score <= 100){
        dataCell.style.backgroundColor = "green"
    } else if(score >= 60 && score < 70){
        dataCell.style.backgroundColor = "red";
    } 

}

function loadStatData(activeTab) {
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
                        percentageColor(percentageValue, dataCell);
                    }

                    row.appendChild(dataCell);
                }
                tableBody.appendChild(row);
           })
           
        })
        .catch(error => {
            console.error("Error Fetching JSON:", error);
        });
}
