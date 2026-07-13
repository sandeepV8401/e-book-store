import React from "react";
import "./CartCard.css";
import b1 from "../../../shared/assets/books/b1.jpg";
import useCart from "../hooks/useCart";

const CartCard = ({ book }) => {
  const { removeFromCart, updateCart } = useCart();
  return (
    <section className="cart-card">
      <div className="cart-image">
        <img src={book.image} alt="cart-image" />
      </div>
      <div className="cart-content">
        <div className="cart-text">
          <p>
            <span>Title: </span>
            <span>{book.title}</span>
          </p>
          <p>
            <span>Author: </span>
            <span>{book.author}</span>
          </p>
          <p>
            <span>Description: </span>
            <span>This is hard coded description</span>
          </p>
          <p>
            <span>Price: </span>
            <span>{book.price}</span>
          </p>
        </div>
        <div className="cart-actions">
          <div className="actions-text">
            <span>Qty</span>
            <div className="cart-qty">
              <span onClick={() => updateCart(book.id, "dec")}>-</span>
              <span>{book.quantity}</span>
              <span onClick={() => updateCart(book.id, "inc")}>+</span>
            </div>
          </div>

          <button className="cart-btn" onClick={() => removeFromCart(book.id)}>
            Remove
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartCard;
