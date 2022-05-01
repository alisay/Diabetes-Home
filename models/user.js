const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('mongoose-bcrypt')

const User = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        default: ""
    },
    roles: { 
        type: Array ,
        default: ['clinician']
    },
    profile: {
        firstname: { type: String },
        lastname: { type: String },
        message: { type: String },
    },
    related_users: [
        //relationship key: Clinician: 0, Patient: 1
        { id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, username: { type: String }, relationship: { type: Number } }
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

User.plugin(require('mongoose-bcrypt'));

User.statics.findByName = function (user) {
    return this.find({username: user});
}

User.statics.findByEmail = function (user) {
    return this.find({email: user});
}

User.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
}

module.exports = mongoose.model('user', User);
