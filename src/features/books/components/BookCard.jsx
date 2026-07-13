import React from "react";
import "./BookCard.css";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../cart/hooks/useCart";
import useBooks from "../hooks/useBooks";

const BookCard = ({ id, title, author, image, price, stock }) => {
  const { books, loading } = useBooks();
  const Navigate = useNavigate();
  const { cartItems, addToCart, setCheckOutItems } = useCart();

  const isAdded = cartItems.some((item) => item.id === id);
  const book = books.find((item) => item.id === Number(id));
  const handleClick = (id) => {
    Navigate(`/book/${id}`);
  };
  const handleBuyNow = () => {
    setCheckOutItems([
      {
        ...book,
        quantity: 1,
      },
    ]);
    Navigate("/checkout");
  };

  return (
    <main className="card-wrapper">
      <div className="book-image" onClick={() => handleClick(id)}>
        <img src={image} alt="book" />
      </div>
      <div className="book-content">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">{author}</p>
        <p className="book-price">
          <strong> ₹&nbsp;{price}</strong>
        </p>
      </div>
      <div className="book-action">
        <button
          className="btn"
          disabled={isAdded}
          onClick={() => addToCart({ id, title, author, image, price, stock })}
        >
          {isAdded ? "Added" : "Add to cart"}
        </button>
        <button className="btn" onClick={() => handleBuyNow()}>
          Buy Now
        </button>
      </div>
    </main>
  );
};

export default BookCard;
