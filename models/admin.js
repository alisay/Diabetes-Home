import mongoose from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
const { Schema, model } = mongoose;

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


Admin.plugin(bcrypt);
export default model('Admin', Admin);
