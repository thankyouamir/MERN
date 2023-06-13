const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");
const user = require("./db/user");
const addProduct = require("./db/addProduct");
app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let User = new user(req.body);
  let result = await User.save();
  result = result.toObject();
  delete result.password;

  res.send(result); //from here variable name i.e result could be different because it will be passed as an argument in model
});
app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "No user found" });
  }
});

app.post("/add-product", async (req, res) => {
  let products = new addProduct(req.body); //products instance is used here for adding product.
  let result = await products.save();
  res.send(result);
});
app.listen(5000);
