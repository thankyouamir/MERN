import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);
  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/products/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };
  const updateProductBtn = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/products/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/");
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter product name"
      />

      <input
        className="inputBox"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price in INR"
      />

      <input
        className="inputBox"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter product category"
      />

      <input
        className="inputBox"
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter product company"
      />

      <button onClick={updateProductBtn} className="addBtn">
        Update
      </button>
    </div>
  );
};

export default Update;
