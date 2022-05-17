import { getClinician, getPatientId } from "../dbutils.js";

export async function clinicianDashboard(req, res) {
    const user = await getClinician(req.user.username);
    // user.patients = await Promise.all(user.patients.map(
    //                           async p => await getPatientId(p)));

    res.render('clinicianDashboard', {
        user,
        css: "stylesheets/clinicianDashboard.css",                            
    })
}
