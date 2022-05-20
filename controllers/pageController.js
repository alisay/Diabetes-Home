import { getPatient, getPatientId, getLeaderboard } from '../dbutils.js';

function formatMeasurements(user) {
    for (const measurement of user?.metrics.keys()) {
        user.metrics[measurement].unit = UNITS[measurement];
    }
    return user.metrics;
}

function formatLeaderboard(leaderboard) {
    leaderboard.map((e) => e.engagementRate = (e.engagementRate * 100).toFixed(1));
    return leaderboard;
}

export async function patientDashboard(req, res) {
    const hours = new Date().getHours();
    const timeString = hours < 12 ? 'morning' : (hours < 19 ? 'afternoon' : 'evening');

    const user = await getPatient('PatTap');
    const measurements = formatMeasurements(user);

    const leaderboard = formatLeaderboard(await getLeaderboard());

    res.render('patientDashboard', {
        timeString,
        user,
        measurements,
        leaderboard,
        css: 'stylesheets/patientDashboard.css',
    });
}

export async function clinicianDashboard(req, res) {
    const { user } = req;
    console.log(user);
    if(user.patients){
        user.patients = await Promise.all(user.patients.map(
            async (p) => await getPatientId(p),
        ));    
    } else {
        user.patients = []
    }

    res.render('clinicianDashboard', {
        user, patients: user.patients,
        css: 'stylesheets/clinicianDashboard.css',
    });
}

