import { UNITS, Patient } from "../models/index.js";

// decorator function
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
