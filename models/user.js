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
        unique: true,
        required: true,
    },
    password: {
        type: String,
        // bcrypt: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        default: "",
    },
    isClinician: {
        type: Boolean,
        default: false,
    }
}, options);


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
    streak: Number,
    engagementRate: Number
}, options);

const ClinicianSchema = new Schema({
    firstName: String, 
    lastName: String,
    // This needs to be an array of object IDs!
    patients: [ObjectId]
})

// Admin.plugin(bcrypt);

UserSchema.plugin(bcrypt);

UserSchema.statics.findByName = function (user) {
    return this.find({username: user});
}

UserSchema.statics.findByEmail = function (user) {
    return this.find({email: user});
}

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
}

export const User = model('user', UserSchema);
export const Patient = User.discriminator('Patient', PatientSchema);
export const Clinician = User.discriminator('Clinician', ClinicianSchema);

