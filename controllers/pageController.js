import User from '../models/dummyData/dummyUser.js';

export const differentiateDashboard = (req, res) => {
    //This is just for deliverable two where users maybe be hard-coded
    const {userType} = req.body 
    let user
    userType === 'clinician' ? user = User.filter(x=>x.id=='999') : user = User.filter(x=>x.id=='6265edce2cc273a8c7c696dc')
    res.render('patientDashboard', {headTitle: 'Dashboard', myProfile: user})
}

export const displayDashboard = (req, res) => {
    let time;
    if (Date.now().hours < 12) {
        time = 'morning';
    } else {
        time = 'evening';
    }
    
    res.render('patientDashboard', { 
        timeString: time, name: "Jeff", streak: 8, 
        clinician: "Shivan", messageTime: "8 hours ago",
        messageContent: "omg",
        user: [
            ['ali', 3], ['baab', 7], ['crana', 9], ['dowa', 15], ['exi', 21]
        ],
        css: "stylesheets/index.css" 
    });
    // const myDetails = User.filter(datum=>datum.username==='Chris')
    // const myWeight = Weight.filter(entry=>entry.metadata.patientID=='2002')
    // res.render('dashboard', {headTitle: 'Dashboard', weight: myWeight, data: myDetails, TESTING: false})
}  