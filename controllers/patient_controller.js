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

const dummyTodayMeasurements =  {
    "blood": {"lastRecord" : 70},
    "insulin": {"lastRecord" : 3},
    "steps": null,
    "weight": {"lastRecord" : null}
}

const dummyRankInfo = [
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


function fetchPersonalMsg(){
    const username = dummyPersonalInfo.user.username
    const welMessage = `Good day! ${username}. You are on a streak of 3 days!`;
    return welMessage;
}

function fetchUnreadCliName(){
    const cliName = dummyCliInfo.clinician.cliName
    const notification = `Dr.${cliName} sent you a message`;

    // document.querySelector(".unread").insertAdjacentHTML("beforeend", notification);
    return notification;
}

function fetchUnreadMsg(){
    const cliMessage = dummyCliInfo.clinician.message;
    return cliMessage;
}

function getTodayMeasurements(){
    return dummyTodayMeasurements;
}

function fetchLeaderboardData(){
    const users = dummyRankInfo
    return users
}


const patientDashboard = (req, res) => {
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
    patientDashboard,
}