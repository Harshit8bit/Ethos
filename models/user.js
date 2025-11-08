const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
//username and password automatic decided by passowrdLocalMongoose,

const userSchema = new Schema({

    email : {
        type : String,
        required: true,
    }
});

userSchema.plugin(passportLocalMongoose); //username , hashing & salting password

module.exports = mongoose.model('User', userSchema);