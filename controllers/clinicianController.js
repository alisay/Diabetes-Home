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
    console.log(data);

    res.render('patientData', {
        data: [1, 2, 3]
    });
}
