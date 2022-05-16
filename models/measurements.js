import mongoose from "mongoose";
const { Schema, ObjectId, model } = mongoose;

const MeasurementsSchema = Schema({
    metadata: { 
        user: ObjectId,
        type: { type: String },
        index: true
    },
    
    measurement: Number, 
    comment: String,
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
