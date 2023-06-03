const express= require ("express");
const app= express();
const mongoose =require("mongoose");
const connectDb=async ()=>{
    mongoose.connect('mongodb://localhost:27017/mern',{})
    .then(result=>console.log("connected"))
    .catch(err=> console.log(err));
    const userSchema= new mongoose.Schema({});
    const userModel=new mongoose.model('users',userSchema);
    const data =await userModel.find();
    console.warn(data);

}
connectDb();
app.listen(5000);