import mongoose from "mongoose";
const { Schema, ObjectId, model } = mongoose;

const MeasurementsSchema = Schema({
    metadata: { 
        user: ObjectId,
        type: { type: String }
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

MeasurementsSchema.index({ "metadata.user": 1, "metadata.type": 1 });
export default model('Measurements', MeasurementsSchema);

