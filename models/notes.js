import mongoose from "mongoose";
const { Schema, ObjectId, model } = mongoose;

const NotesSchema = Schema({
    clinician: ObjectId,
    patient: ObjectId,
    note: String,
},
    {
        timeseries: {
            timeField: 'timestamp',
            metaField: 'patient',
            granularity: 'minutes'
        },
        autoCreate: false
    });

export default model('Notes', NotesSchema);
