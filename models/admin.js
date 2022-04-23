const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  password: {
    type: String,
    // bcrypt: true,
    required: true
  }
})


Admin.plugin(require('mongoose-bcrypt'));
module.exports = mongoose.model('Admin', Admin);
