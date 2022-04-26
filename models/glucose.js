const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Glucose = Schema({
    metadata: {patient: mongoose.ObjectId,comment: String},
    glucose: Number,
    timestamp: Date,
},
    {
        timeseries: {
            timeField: 'timestamp',
            metaField: 'metadata',
            granularity: 'seconds'
        },
        autoCreate: false,
        expireAfterSeconds: 220752000
    });

module.exports = mongoose.model('Glucose', Glucose);
