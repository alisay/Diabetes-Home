import mongoose from "mongoose"
import 'dotenv/config'

await mongoose.connect(process.env.URI);

const PatientSchema = new mongoose.Schema({ 
    firstName: String, 
    lastName: String,
    nickname: String,
    gender: String,
    dob: Date,
    lastWeight: Number,
    lastBloodPressure: Number,
    lastStepsWalked: Number, 
    lastInsulin: Number, 
    registered: Date,
    engagement: Number,
    clinicianId: mongoose.ObjectId
});

export const Patient = mongoose.model('Patient', PatientSchema);

const WeightEntrySchema = new mongoose.Schema({
    patientId: mongoose.ObjectId,
    clinicianId: mongoose.ObjectId,
    date: Date,
    value: Number
});

const BPEntrySchema = new mongoose.Schema({
    patientId: mongoose.ObjectId,
    clinicianId: mongoose.ObjectId,
    date: Date,
    value: Number
});

const StepsEntrySchema = new mongoose.Schema({
    patientId: mongoose.ObjectId,
    clinicianId: mongoose.ObjectId,
    date: Date,
    value: Number
});

const InsulinEntrySchema = new mongoose.Schema({
    patientId: mongoose.ObjectId,
    clinicianId: mongoose.ObjectId,
    date: Date,
    value: Number
});

export const WeightEntry = mongoose.model('WeightEntry', WeightEntrySchema);
export const BPEntry = mongoose.model('BPEntry', BPEntrySchema);
export const StepsEntry = mongoose.model('StepsEntry', StepsEntrySchema);
export const InsulinEntry = mongoose.model('InsulinEntry', InsulinEntrySchema);
