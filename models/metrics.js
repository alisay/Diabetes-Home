const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Metrics = Schema({
    metadata: { patient: mongoose.ObjectId, comment: String },
    glucose: Number,
    weight: Number,
    insulin: Number,
    steps: Number,
    timestamp: Date,
},
    {
        timeseries: {
            timeField: 'timestamp',
            metaField: 'metadata',
            granularity: 'hours'
        },
        autoCreate: false,
        //Record kept for statutory minimum of 7 years before auto-delete
        expireAfterSeconds: 220752000
    });

module.exports = mongoose.model('Metrics', Metrics);
