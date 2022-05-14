import { resetPassword } from "../controllers/authController.js";
import { Patient, Clinician } from "../models/index.js";

export const getAllPatients = function (req) {
    return Clinician.findOne({ username: req.params.username })
};

// ADD Patient
export const addPatient = async function (req) {
    const { email, password, username } = req.body;
    let clinician = await Clinician.findOne({ username: req.params.username }).exec();

    let newPatient = Patient.create({ email, password, username, clinician })
        .catch(err =>
            res.send(err))
        
    
    if (newPatient) {
        clinician.patients.push(newPatient)
        console.log(newPatient)
    } else {
        console.log('error')
    }
    
    clinician.findOneAndUpdate({
            username: clinician.username,
            patients: clinician.patients
    })

    return newPatient
};

// EDIT Patient
export const updatePatient = function (req) {
    return Patient.findOneAndUpdate({username: req.params.username}, req.body, {
        new: true
    });
};
