const mongoose =require("mongoose");
require('./config');

const userSchema = new mongoose.Schema({
    name : String,//during json file inserting "name" but "name " not allowed
    email : String,
    password : String
});

module.exports = mongoose.model("users",userSchema);