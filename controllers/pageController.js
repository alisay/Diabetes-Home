import { format } from 'date-fns';
import { UNITS, TYPES } from '../models/index.js';
import { getPatient, getPatientId, getPatientData, getLeaderboard } from '../dbutils.js';

function formatMeasurements(user) {
    if (user?.metrics == null) return {};

    for (const measurement of Object.keys(user?.metrics)) {
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
    var patients;
    if (user.patients) {
        patients = await Promise.all(user.patients.map(getPatientId));    
    } else {
        patients = []
    }

    res.render('clinicianDashboard', {
        user, patients,
        css: 'stylesheets/clinicianDashboard.css',
    });
}

export async function viewHistory(req, res) {
    if (req.query.username == null) {
        return res.redirect('/dashboard');
    }

    const patient = await getPatient(req.query.username);

    // Auth Check
    if (req.query.username == req.user.username) {
        var isClinician = false;
    } else if (patient.clinician._id == req.user._id) {
        var isClinician = true;
    } else {
        res.status(401).redirect("/dashboard");
        return;
    }

    // Check types
    const trackingTypes = TYPES.filter((t) => patient.metrics[t] != null);
    const type = trackingTypes[0];
    const data = new Map();
    for (const t of trackingTypes) {
        data.set(t, await getPatientData(patient._id, t));
    }
    const datapoints = data.get(type).map((e) => e.measurement);

    // Chart constants
    const { low, high } = patient.metrics.glucose.threshold;
    const min = Math.min(low, ...datapoints);
    const max = Math.max(high, ...datapoints);
    const ymin = min - (max - min) * 0.2;
    const ymax = max + (max - min) * 0.2;
    const chart = {
        min, max, ymin, ymax,
    };

    // Table Contents
    const allDays = {};
    Array.from(Array(28).keys()).forEach((idx) => {
        const d = new Date();
        d.setDate(d.getDate() - idx);
        allDays[format(d, 'dd/MM')] = Object.fromEntries(trackingTypes.map((e) => [e, {}]));
    });
    data.forEach((entries, type) => entries.forEach((e) => {
        allDays[format(e.timestamp, 'dd/MM')][type].measurement = e.measurement;
        allDays[format(e.timestamp, 'dd/MM')][type].comment = e.comment;
    }));

    const today = format(new Date(), 'dd/MM');

    res.render('viewHistory', {
        isClinician,
        patient,
        type: 'Glucose',
        trackingTypes,
        datapoints,
        chart,
        allDays,
        today,
        notes: {},
        css: 'stylesheets/viewHistory.css'
    });
}

export async function editPatient(req, res) {
    const username = req.query.username;
    const user = await getPatient(username);

    if (user.clinician._id != req.user._id) {
        res.status(401).redirect('/dashboard');
        return;
    }
    
    const dob = user.dob != null ? format(user.dob, "yyyy-MM-dd") : "";

    res.render('editPatient', { ...user, dob, css: 'stylesheets/editPatient.css' });
}
