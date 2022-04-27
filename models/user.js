const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        // bcrypt: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    // user_type key: Clinician: 0, Patient: 1
    user_type: { type: Number },
    profile: {
        firstname: { type: String },
        lastname: { type: String },
        message: { type: String },
    },
    related_users: [
        //relationship key: Clinician: 0, Patient: 1
        { id: { type: mongoose.ObjectID }, username: { type: String }, relationship: { type: Number } }
    ],
    metrics: {
        glucose: { threshold: { low: { type: Number }, high: { type: Number } } },
        weight: { threshold: { low: { type: Number }, high: { type: Number } }},
        insulin: { threshold:  { low: { type: Number }, high: { type: Number } } },
        steps: { threshold:  { low: { type: Number }, high: { type: Number } } },
    },
},
    {
        timestamps: { createdAt: 'created_at' }
    }
)

Admin.plugin(require('mongoose-bcrypt'));
module.exports = mongoose.model('User', User);
