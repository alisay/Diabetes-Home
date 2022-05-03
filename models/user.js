import mongoose from "mongoose";
import bcrypt from 'mongoose-bcrypt';
const { Schema, ObjectId, model } = mongoose;

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

export const User = model('user', UserSchema);

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
    clinician: ObjectId,
    clinicianMessage: String,
    streak: Number
}, options);

const ClinicianSchema = new Schema({
    firstName: String, 
    lastName: String,
    patients: [ObjectId]
})

export const Patient = User.discriminator('Patient', PatientSchema);
export const Clinician = User.discriminator('Clinician', ClinicianSchema);

// Admin.plugin(bcrypt);
