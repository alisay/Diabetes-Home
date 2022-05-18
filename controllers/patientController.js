import { getPatient, getLeaderboard } from "../dbutils.js";
import { UNITS, Patient } from "../models/index.js";
import {
    addPatient, 
    updatePatient
} from '../utils/patient_utils.js'

// GET ALL PATIENTS
export const getPatients = function (req, res) {
    // to be completed
}

// ADD NEW PATIENT
export function createPatient(req, res, next) {
    addPatient(req)
        .then((user) => {
            res.status(201)
            res.send(user)
        })
        .catch(err =>
            res.status(500).json({ error: err.message })
        )
}
// EDIT PATIENT DETAILS
export function editPatient(req, res) {
    updatePatient(req).exec((err, user) => {
      if (err) {
        res.status(500);
        return res.json({
          error: err.message
        });
      }
      res.status(200);
      res.send(user);
    });
  }
  

function formatMeasurements(user) {
    for (const measurement in user?.metrics) {
        user.metrics[measurement].unit = UNITS[measurement];
    }
    return user.metrics;
}

function formatLeaderboard(leaderboard) {
    leaderboard.map(e => e.engagementRate = (e.engagementRate * 100).toFixed(1));
    return leaderboard;
}

export async function displayDashboard(req, res) {
    if (req.user == null) {
        res.redirect('/');
    }

    const hours = new Date().getHours();
    const timeString = hours < 12 ? 'morning' : hours < 19 ? 'afternoon' : 'evening';

    const user = await getPatient("PatTap");
    const measurements = formatMeasurements(user);

    const leaderboard = formatLeaderboard(await getLeaderboard());

    res.render('patientDashboard', {
        timeString, user, measurements, leaderboard,
        css: "stylesheets/patientDashboard.css"
    });
}

export async function postData(req, res) {
    if (req.user == null) {
        res.redirect('/');
    }

    for (const [key, value] of Object.entries(req.body)) {
        if (UNITS.hasOwnProperty(key)) {
            await Patient.updateOne({ username: "PatTap" }, { $set: { 
                [`metrics.${key}.lastRecord`]: value
            } });

            await Measurements.create({
                metadata: { type: key },
                measurement: value
            })
        }
    }

    res.redirect('/patientDashboard');
}
