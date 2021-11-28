const mongoose = require('mongoose');

const userSchema = mongoose.Schema;
const user = new userSchema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    joinedDate: { type: Date, default: Date.now() }
});

const userModel = mongoose.model('user', user);

module.exports = userModel