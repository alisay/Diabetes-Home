import { UNITS, Patient } from '../models/index.js';
import { createPatient as dbCreatePatient, updatePatient, getPatient } from '../dbutils.js';

// ADD NEW PATIENT
export function createPatient(req, res, next) {
    dbCreatePatient(req)
        .then((user) => {
            res.status(201);
            res.send(user);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
}

// EDIT PATIENT DETAILS
export async function editPatient(req, res) {
    const username = req.query.username;
    const user = await getPatient(username);

    if (user.clinician._id != req.user._id) {
        res.status(401).redirect('/dashboard');
        return;
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
    
    await updatePatient(username, { firstName, lastName, gender, dob, metrics });

    res.redirect("/dashboard");
}

export async function postData(req, res) {
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
