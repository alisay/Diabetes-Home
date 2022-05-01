import { Schema, ObjectID, model } from "mongoose"

const options = {
    timestamps: true, 
    discriminatorKey: 'kind'
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        // bcrypt: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    isClinician: Boolean
}, options);

const User = model('User', UserSchema);

const PatientSchema = new Schema({
    firstName: String, 
    lastName: String,
    nickname: String,
    gender: String,
    dob: Date,
    metrics: {
        glucose: { threshold: { low: Number, high: Number }, lastRecord: Number },
        weight: { threshold: { low: Number, high: Number }, lastRecord: Number },
        insulin: { threshold:  { low: Number, high: Number }, lastRecord: Number },
        steps: { threshold:  { low: Number, high: Number }, lastRecord: Number },
    },
    clinician: ObjectID,
    clinicianMessage: String,
}, options);

const ClinicianSchema = new Schema({
    firstName: String, 
    lastName: String,
    patients: [ObjectID]
})

export const Patient = User.discriminator('Patient', PatientSchema);
export const Clinician = User.discriminator('Clinician', ClinicianSchema);

Admin.plugin(require('mongoose-bcrypt'));

