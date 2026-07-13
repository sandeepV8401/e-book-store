import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo/book-store.jpg";
import { FaShoppingCart, FaUser, FaSearch, FaHeart } from "react-icons/fa";
import useCart from "../../../features/cart/hooks/useCart";
import profile from "../../assets/profile-pic.avif"

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();
  const { cartItems } = useCart();
  const [search, setSearch] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    Navigate(`/books?search=${encodeURIComponent(search.trim())}`);
  };
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="nav-search">
          <FaSearch />
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Search by title, author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => {
                setSearch("");
                Navigate("/books");
              }}
            >
              ✕
            </button>
          )}
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/books">Books</NavLink>
          </li>
        </ul>
        <div className="nav-actions">
          <NavLink to="/cart" className="nav-notification ">
            <FaShoppingCart />
            <span>{cartItems.length}</span>
          </NavLink>

          <div className="nav-user " onClick={() => setOpen(!open)}>
            {/* <FaUser /> */}
            <img src={profile} alt="profile-pic"/>
            {open && (
              <div className="dropdown">
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/orders">Orders</NavLink>
                <button>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
