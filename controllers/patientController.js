import { getPatient, getLeaderboard } from "../dbutils.js";
import { UNITS, Patient } from "../models/index.js";

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

export async function postData(req, res) {
    for (const [key, value] of Object.entries(req.body)) {
        if (UNITS.hasOwnProperty(key)) {
            await Patient.updateOne({ username: "PatTap" }, { $set: { 
                [`metrics.${key}.lastRecord`]: value
            } });
        }
    }
    res.redirect('/patientDashboard');
}
