const mongoose = require("mongoose");
require("./config");

const productSchema = new mongoose.Schema({
  name: String, //during json file inserting "name" but "name " not allowed
  price: Number,
  category: String,
  userId: String,
  company: String,
});

module.exports = mongoose.model("products", productSchema);
