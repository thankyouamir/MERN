const express= require ("express");
const app= express();
require('./db/config');
const user = require('./db/user');
app.use(express.json());

app.post("/register",async (req,res)=>{
    let User = new user(req.body);
    let result = await User.save();

    res.send(result);
})

app.listen(5000);