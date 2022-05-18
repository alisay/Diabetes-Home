import { format } from 'date-fns';
import { TYPES } from '../models/index.js';
import {
    getClinician, getPatient, getPatientId, getPatientData,
} from '../dbutils.js';

export async function clinicianDashboard(req, res) {
    if (req.user == null) {
        return res.redirect('/');
    }

    const { user } = req;
    user.patients = await Promise.all(user.patients.map(
        async (p) => await getPatientId(p),
    ));

    res.render('clinicianDashboard', {
        user,
        css: 'stylesheets/clinicianDashboard.css',
    });
}

export async function viewPatient(req, res) {
    if (req.user == null) {
        return res.redirect('/');
    }

    const patient = await getPatient(req.params.username);

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
        allDays[format(d, 'dd/MM')] = Object.fromEntries(TYPES.map((e) => [e, {}]));
    });
    data.forEach((entries, type) => entries.forEach((e) => {
        console.log(allDays[format(e.timestamp, 'dd/MM')]);
        console.log(format(e.timestamp, 'dd/MM'));
        allDays[format(e.timestamp, 'dd/MM')][type].measurement = e.measurement;
        allDays[format(e.timestamp, 'dd/MM')][type].comment = e.comment;
    }));

    const today = format(new Date(), 'dd/MM');

    res.render('viewPatient', {
        patient,
        type: 'Glucose',
        trackingTypes,
        datapoints,
        chart,
        allDays,
        today,
        notes: {},
    });
}
