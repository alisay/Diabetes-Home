function fetchPersonalMsg(){
    fetch("https://reqres.in/api/users/2")
        .then(response =>{
            if(!response.ok){
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data =>{
            const name = data.data.first_name
            const message = `<p>Good (time of day), ${name}. You are on a streak of (days)!<\p>`;

            document.querySelector(".personal").insertAdjacentHTML("beforeend", message);
        }).catch(error => {
            console.log(error);
        })
}

function fetchUnreadCliName(){
    fetch("https://reqres.in/api/users/2")
        .then(response =>{
            if(!response.ok){
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data =>{
            const name = data.data.last_name
            const notification = `<p>(Title).${name} sent you a message at (time)<\p>`;

            document.querySelector(".unread").insertAdjacentHTML("beforeend", notification);
        }).catch(error => {
            console.log(error);
        })
}

function fetchUnreadMsg(){
    fetch("https://reqres.in/api/users/2")
        .then(response =>{
            if(!response.ok){
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data =>{
            const name = data.data.email
            const message = `<div class="collapsible-message"><p> Hi, my email is ${name}. Have a good day <\p></div>
            `;

            document.querySelector(".unread").insertAdjacentHTML("afterend", message);
        }).catch(error => {
            console.log(error);
        })
}

function fetchLeaderboardData(){
    fetch("https://reqres.in/api/users")
        .then(response =>{
            if(!response.ok){
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data =>{
            const users = data.data.map(user =>{
                return `
                <div class="user rank-widget">
                    <div class= "user-info">
                        <h3>${user.first_name}</h3>
                        <p>New memeber</p>
                        <div class="progress"></div>
                    </div>
                    <h2 class="percentage">${user.id*5}%</h2>
                </div>
                `;
            })
            .join("")

            document.querySelector(".leaderboard").insertAdjacentHTML("beforeend", users);
    }).catch(error => {
        console.log(error);
    })
}



fetchUnreadCliName();
fetchPersonalMsg();
fetchUnreadMsg();
fetchLeaderboardData();
