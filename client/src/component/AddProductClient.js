import React from "react";
import { useState } from "react";

const addProductClient = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const addProductBtn = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    try {
      // console.warn(name, price, category, company);
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      let result = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        body: JSON.stringify({ name, price, category, company, userId }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (result.ok) {
        result = await result.json();

        alert("product saved successfully");
      } else {
        throw new Error("An error occurred while adding the product");
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };
  return (
    <div className="product">
      <h1>add-product</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter product name"
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        className="inputBox"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price in INR"
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        className="inputBox"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter product category"
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        className="inputBox"
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter product company"
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button onClick={addProductBtn} className="addBtn">
        Add
      </button>
    </div>
  );
};

export default addProductClient;
