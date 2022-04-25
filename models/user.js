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
    password: {
        type: String,
        required: true
    },
    user_type: {
        patient: {type:Boolean, default:false},
        clinician: {type:Boolean, default:true},
    },
    profile: {
        firstname:{type: String},
        lastname: {type: String},
    },
    related_users: [
        { id: {type: mongoose.ObjectID}, username: {type: String}, relationship: {type: String}}
    ],
    metrics: {
        glucose: {type:Boolean, default:true},
        weight: {type:Boolean, default:true},
        insulin: {type:Boolean, default:true},
        steps: {type:Boolean, default:true},
    }
},
    {
        timestamps: { createdAt: 'created_at' }
    }
)

Admin.plugin(require('mongoose-bcrypt'));
module.exports = mongoose.model('User', User);
