const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose);// we use passportLocalMongoose as plugin because it automatically implement hashing username and password .we don't have to write our own code for these

module.exports = mongoose.model('User', userSchema);
