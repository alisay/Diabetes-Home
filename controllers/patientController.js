import { UNITS, Patient } from '../models/index.js';
import {
    addPatient
} from '../utils/patient_utils.js';
import { updatePatient } from '../dbutils.js';

// ADD NEW PATIENT
export function createPatient(req, res, next) {
    addPatient(req)
        .then((user) => {
            res.status(201);
            res.send(user);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
}

// EDIT PATIENT DETAILS
export async function editPatient(req, res) {
    const user = req.query.username;
    if (user == null) {
        return;  // error?
    }

    const { firstName, lastName, gender, dob, 
        glucose, insulin, steps, weight } = req.body;
    const metrics = Object.fromEntries(
        Object.entries({ glucose, insulin, steps, weight })
              .filter(([k, v]) => v != null)
              .map(([k, v]) => [k, { threshold: { 
                          low: req.body[k + '__low'],
                          high: req.body[k + '__high']
                  }}])
    );
    
    await updatePatient(user, { firstName, lastName, gender, dob, metrics });

    res.redirect("/dashboard");
}

export async function postData(req, res) {
    if (req.user == null) {
        return res.redirect('/');
    }

    for (const [key, value] of Object.entries(req.body)) {
        if (UNITS.hasOwnProperty(key)) {
            await Patient.updateOne({ username: 'PatTap' }, {
                $set: {
                    [`metrics.${key}.lastRecord`]: value,
                },
            });

            await Measurements.create({
                metadata: { type: key },
                measurement: value,
            });
        }
    }

    res.redirect('/patientDashboard');
}
