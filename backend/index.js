const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");
const user = require("./db/user");
app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let User = new user(req.body);
  let result = await User.save();

  res.send(result); //from here variable name i.e result could be different because it will be passed as an argument in model
});

app.listen(5000);
