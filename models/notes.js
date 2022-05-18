import mongoose from 'mongoose';

const { Schema, ObjectId, model } = mongoose;

const NotesSchema = Schema(
    {
        clinician: ObjectId,
        patient: ObjectId,
        note: String,
        timestamp: Date,
    },
    {
        timeseries: {
            timeField: 'timestamp',
            metaField: 'patient',
            granularity: 'minutes',
        },
        autoCreate: false,
    },
);

export default model('Notes', NotesSchema);
