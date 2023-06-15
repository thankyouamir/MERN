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

app.get("/products", async (req, res) => {
  let products = await addProduct.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "no product found" });
  }
});
app.delete("/products/:id", async (req, res) => {
  // res.send(req.params.id);
  let result = await addProduct.deleteOne({ _id: req.params.id });
  res.send(result);
});
app.get("/products/:id", async (req, res) => {
  let result = await addProduct.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "not found" });
  }
});
app.put("/products/:id", async (req, res) => {
  let result = await addProduct.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});
app.get("/search/:key", async (req, res) => {
  let result = await addProduct.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});
app.listen(5000);
