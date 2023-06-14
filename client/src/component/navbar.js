import React from "react";

import { Link, useNavigate } from "react-router-dom";
const navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/add">Add Product</Link>
          <Link to="/update">Update Product</Link>

          <Link to="/profile">Profile</Link>

          {auth ? (
            <Link onClick={logout} to="/signup">
              Logout
            </Link>
          ) : (
            <Link to="/signup">SignUp</Link>
          )}
          {auth ? <Link>Welcome User</Link> : <Link to="/login">Login</Link>}
        </li>
      </ul>
    </div>
  );
};
export default navbar;
