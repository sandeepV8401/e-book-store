import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./BookDetailsPage.css";
import useBooks from "../hooks/useBooks.js";
import Loader from "../../../shared/components/loader/Loader.jsx";
import useCart from "../../cart/hooks/useCart.js";

const BookDetailsPage = () => {
  const { books, loading } = useBooks();
  const { cartItems, addToCart, setCheckOutItems } = useCart();
  const Navigate = useNavigate();
  const { id } = useParams();
  const book = books.find((item) => item.id === Number(id));
  if (!book) return <h1>No data found</h1>;
  const isAdded = cartItems.some((item) => item.id == book.id);

  if (loading) return <Loader />;

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
    <section className="book-details">
      <div className="details-image">
        <img src={book.image} alt={book.title} />
      </div>

      <div className="details-content">
        <h2>{book.title}</h2>

        <p>
          <strong>Author:</strong> {book.author}
        </p>

        <p>
          <strong>Description:</strong> {book.description}
        </p>

        <h3 className="price">₹{book.price}</h3>

        <div className="details-actions">
          <button
            className="btn"
            disabled={isAdded}
            onClick={() => addToCart(book)}
          >
            {isAdded ? "Added" : " Add to Cart"}
          </button>
          <button className="btn" onClick={() => handleBuyNow()}>
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookDetailsPage;
