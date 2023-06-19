const express = require("express");
const app = express();
const Jwt = require("jsonwebtoken");
const jwtkey = "@mir";
require("./db/config");
const userModel = require("./db/user");
const cors = require("cors");
const addProduct = require("./db/addProduct");
app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let User = new userModel(req.body);
  let result = await User.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "something went wrong" });
    } else {
      res.send({ result, auth: token });
    }
  });

  // res.send(result); //from here variable name i.e result could be different because it will be passed as an argument in model
});
app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await userModel.findOne(req.body).select("-password");
    if (user) {
      // res.send(user);send function can not execute twice same time
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "something went wrong" });
        } else {
          res.send({ user, auth: token });
        }
      });
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "No user found" });
  }
});

app.post("/add-product", verifyTokenMiddleware, async (req, res) => {
  let products = new addProduct(req.body); //products instance is used here for adding product.
  let result = await products.save();
  res.send(result);
});

app.get("/products", verifyTokenMiddleware, async (req, res) => {
  let products = await addProduct.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "no product found" });
  }
});
app.delete("/products/:id", verifyTokenMiddleware, async (req, res) => {
  // res.send(req.params.id);
  let result = await addProduct.deleteOne({ _id: req.params.id });
  res.send(result);
});
app.get("/products/:id", verifyTokenMiddleware, async (req, res) => {
  let result = await addProduct.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "not found" });
  }
});
app.put("/products/:id", verifyTokenMiddleware, async (req, res) => {
  let result = await addProduct.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});
app.get("/search/:key", verifyTokenMiddleware, async (req, res) => {
  try {
    if (!isNaN(req.params.key)) {
      result = await addProduct.find({ price: Number(req.params.key) });
    } else {
      result = await addProduct.find({
        $or: [
          { name: { $regex: req.params.key, $options: "i" } },
          { category: { $regex: req.params.key, $options: "i" } },
          { company: { $regex: req.params.key, $options: "i" } },
        ],
      });
    }
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
function verifyTokenMiddleware(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "please add token with header" });
  }
}

app.listen(5000);
