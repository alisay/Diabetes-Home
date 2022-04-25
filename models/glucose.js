const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Glucose = Schema({
    patient: mongoose.ObjectId,
    glucose: Number,
    timestamp: Date,
},
    {
        timeseries: {
            timeField: 'timestamp',
            metaField: 'patient',
            granularity: 'seconds'
        },
        autoCreate: false,
        expireAfterSeconds: 220752000
    });

module.exports = mongoose.model('Glucose', Glucose);
