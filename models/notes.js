const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notes = Schema({
    patient: mongoose.ObjectId,
    note: String,
},
    {
        timeseries: {
            timeField: 'timestamp',
            metaField: 'patient',
            granularity: 'seconds'
        },
        autoCreate: false,
        //Record kept for statutory minimum of 7 years before auto-delete
        expireAfterSeconds: 220752000
    });

module.exports = mongoose.model('Notes', Notes);
