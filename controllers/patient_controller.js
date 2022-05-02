const User = require('../models/dummyData/dummyUser')

const dummyPersonalInfo = {
    "user": {
        "username": "Pat",
        "nickname": "Tap",
        "avatar": "https://reqres.in/img/faces/2-image.jpg"
    },
}

const dummyCliInfo = {
    "clinician": {
        "cliName": "Chris",
        "message": "I have a good news",
        "avatar": "https://reqres.in/img/faces/2-image.jpg"
    },
}

const dummyTodayMeasurements = {
    "measurements":  [
        {
            "data": 200,
            "unit": "nmol/L"
        },
        {
            "data": 300,
            "unit": "steps"
        },
        {
            "data": null,
            "unit": "doses"
        }
    ]
}

const dummyRankInfo = {
    "users":  [
        {
            "engageRate": 30,
            "nickname": "Tap",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
            "engageRate": 20,
            "nickname": "Tony",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
            "engageRate": 10,
            "nickname": "Young",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
        }
    ]
}


function fetchPersonalMsg(){
    const username = dummyPersonalInfo.user.username
    const welMessage = `Good (time of day), ${username}. You are on a streak of (days)!`;
    return welMessage;
}

function fetchUnreadCliName(){
    const cliName = dummyCliInfo.clinician.cliName
    const notification = `(Title).${cliName} sent you a message at (time)`;

    // document.querySelector(".unread").insertAdjacentHTML("beforeend", notification);
    return notification;
}

function fetchUnreadMsg(){
    const cliMessage = dummyCliInfo.clinician.message;
    return cliMessage;
}

function getTodayMeasurements(){
    let rs = ''

    for (let i = 0; i < dummyTodayMeasurements.measurements.length; i++) {
        let div =   `                        
                    <div class = "measurement-widget-container">
                        <input type="checkbox" id ='collapsible-note-${i}'>
                        <label for="collapsible-note">
                            <div class = 'measurement-widget'>
                                <div class = "meansurement-icon"></div>
                        
                                <div class = "measurement-data">
                                    <div class = "measurement-data-container">
                                        <h2>${dummyTodayMeasurements.measurements[i].data}</h2>
                                    </div>
                                    <div class = "measurement-unit-container">
                                        <p>${dummyTodayMeasurements.measurements[i].unit}<p>
                                    </div>
                                </div>
                            </div>
                        </label>

                        <div class="collapsible-note-${i}">
                            <p>dasdaskdjsakdasjdkajdakdjakdjaskdja</p>
                        </div>

                        <div class = "measurement-under"></div>
                    </div>
                    `
                
        rs = rs + div
    }

    return rs;
}

function fetchLeaderboardData(){
    const users = dummyRankInfo
    return users
}


const displayDashboard = (req, res) => {
    res.render('patientDashboard', {headTitle: "Home", 
                                    css: "stylesheets/patientDashboard.css",

                                    welMessage: fetchPersonalMsg(),
                                    notification: fetchUnreadCliName(),
                                    cliMessage: fetchUnreadMsg(),
                                    measurements: getTodayMeasurements(),
                                    users: fetchLeaderboardData()
                                })
}

module.exports = {
    displayDashboard,
}