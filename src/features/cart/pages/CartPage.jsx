import React, { useState } from "react";
import useCart from "../hooks/useCart";
import CartCard from "../components/CartCard";
import "./CartPage.css";
import useBooks from "../../books/hooks/useBooks";
import ConfirmModal from "../../../shared/components/confirmModal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { calculateOrderSummary } from "../../utils/calculateOrderSummary";

const CartPage = () => {
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();

  const {
    cartItems,
    clearCart,

    setCheckOutItems,
  } = useCart();

  if (cartItems.length == 0)
    return (
      <div className="empty-cart">
        <h3>Your cart is empty </h3>
        <p>Add some books to get started! 📚</p>
      </div>
    );
  const {
    totalItems,
    subTotalPrice,
    discountPercentage,
    discountAmount,
    taxAmount,
    totalPrice,
  } = calculateOrderSummary(cartItems);

  const handleCheckout = () => {
    setCheckOutItems(cartItems);
    Navigate("/checkout");
  };
  return (
    <main className="cart-page">
      <div className="cart-page-card">
        {cartItems.map((item) => (
          <CartCard key={item.id} book={item} />
        ))}
      </div>
      <div className="cart-page-content">
        <div className="cart-page-text">
          <div>
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div>
            <span>Sub Total</span>
            <span>{subTotalPrice.toFixed(2)}</span>
          </div>
          <div>
            <span>Discount</span>
            <span>{discountAmount.toFixed(2)}</span>
          </div>
          <div>
            <span>Taxes</span>
            <span>{taxAmount.toFixed(2)}</span>
          </div>
          <div>
            <span>Total (Rounded)</span>
            <span>{Math.round(totalPrice).toFixed(2)}</span>
          </div>
        </div>
        <div className="cart-page-actions">
          <button className="cart-page-btn" onClick={() => handleCheckout()}>
            Checkout
          </button>
          <button className="cart-page-btn" onClick={() => setShowModal(true)}>
            Clear Cart
          </button>
        </div>

        {showModal && (
          <ConfirmModal
            open={showModal}
            title="Clear Cart"
            message="Are you sure you want to clear cart?"
            onConfirm={() => clearCart()}
            onCancel={() => setShowModal(false)}
            confirmText="Yes"
            cancelText="No"
          />
        )}
      </div>
    </main>
  );
};

export default CartPage;
