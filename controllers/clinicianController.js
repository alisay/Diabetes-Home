import { getClinician, getPatient, getPatientId, getPatientData } from "../dbutils.js";

export async function clinicianDashboard(req, res) {
    const user = await getClinician("chrissi");
    user.patients = await Promise.all(user.patients.map(
                              async p => await getPatientId(p)));

    res.render('clinicianDashboard', {
        user,
        css: "stylesheets/clinicianDashboard.css",                            
    })
}

export async function patientData(req, res) {
    const patient = await getPatient("PatTap");
    const data = await getPatientData(patient._id, "glucose");
    const datapoints = data.map(e => e.measurement);

    // Chart constants
    const { low, high } = patient.metrics["glucose"].threshold;
    const min = Math.min(low, ...datapoints);
    const max = Math.max(high, ...datapoints);
    const ymin = min - (max - min) * 0.2;
    const ymax = max + (max - min) * 0.2;

    // Table Contents
    const dataDays = new Object();
    data.forEach(e => {
        e.timestamp.setHours(0, 0, 0, 0);
        dataDays[e.timestamp.toLocaleDateString()] = [e.measurement, e.comment];
    });
    const allDays = new Object();
    new Array.from(Array(28).keys()).forEach(idx => {
        const d = new Date();
        d.setDate(d.getDate() - idx);
        d.setHours(0, 0, 0, 0);
        allDays[d.toLocaleDateString()] = [];
    });
    // console.log(dataDays);
    const table = {...allDays, ...dataDays};

    res.render('patientData', {
        patient, type: "Glucose", datapoints,
        low, high, ymin, ymax,
        table
    });
}
