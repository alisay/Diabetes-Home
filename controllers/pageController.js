import { getPatient, getLeaderboard } from "../dbutils.js";
import { UNITS } from "../models/index.js";

// export const differentiateDashboard = (req, res) => {
//     //This is just for deliverable two where users maybe be hard-coded
//     const {userType} = req.body 
//     let user
//     userType === 'clinician' ? user = User.filter(x=>x.id=='999') : user = User.filter(x=>x.id=='6265edce2cc273a8c7c696dc')
//     res.render('patientDashboard', {headTitle: 'Dashboard', myProfile: user})
// }

function formatMeasurements(user) {
    for (const measurement in user?.metrics) {
        user.metrics[measurement].unit = UNITS[measurement];
    }
    return user.metrics;
}

function formatLeaderboard(leaderboard) {
    leaderboard.map(e => e.engagementRate = (e.engagementRate * 100).toFixed(1));
    return leaderboard;
}

export async function displayDashboard(req, res) {
    const hours = new Date().getHours();
    const timeString = hours < 12 ? 'morning' : hours < 19 ? 'afternoon' : 'evening';
    
    const user = await getPatient("PatTap");
    const measurements = formatMeasurements(user);

    const leaderboard = formatLeaderboard(await getLeaderboard());

    res.render('patientDashboard', { 
        timeString, user, measurements, leaderboard,
        css: "stylesheets/patientDashboard.css" 
    });
}  
