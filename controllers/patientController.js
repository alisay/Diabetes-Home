import { UNITS, Patient } from '../models/index.js';
import {
    addPatient,
    updatePatient,
} from '../utils/patient_utils.js';

// GET ALL PATIENTS
export const getPatients = function (req, res) {
    // to be completed
};

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
export function editPatient(req, res) {
    updatePatient(req).exec((err, user) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message,
            });
        }
        res.status(200);
        res.send(user);
    });
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
