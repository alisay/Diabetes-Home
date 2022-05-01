import mongoose from "mongoose";
const { Schema, ObjectId, model } = mongoose;

const MeasurementsSchema = Schema({
    metadata: { type: ObjectId, index: true },
    glucose: { measurement: Number, comment: String },
    weight: { measurement: Number, comment: String },
    insulin: { measurement: Number, comment: String },
    steps: { measurement: Number, comment: String },
    timestamp: Date,
},
    {
        timeseries: {
            timeField: 'timestamp',
            metaField: 'metadata',
            granularity: 'minutes'
        },
        autoCreate: false
    });

 export default model('Measurements', MeasurementsSchema);
