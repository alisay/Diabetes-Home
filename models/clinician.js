const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bcrypt = require('mongoose-bcrypt')

const Clinician = new Schema({
    email: {
        type: String,
        unique: true,
        require: true
  },
    password: {
        type: String,
        require: true  
    },
    username: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
});

Clinician.plugin(require('mongoose-bcrypt'));

Clinician.statics.findByName = function (user) {
    return this.find({username: user});
}

Clinician.statics.findByEmail = function (user) {
    return this.find({email: user});
}

Clinician.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
}

module.exports = mongoose.model('clinician', Clinician);
