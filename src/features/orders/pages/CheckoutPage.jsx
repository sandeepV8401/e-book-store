import React, { useState } from "react";
import useCart from "../../cart/hooks/useCart";
import "./CheckOutPage.css";
import { calculateOrderSummary } from "../../utils/calculateOrderSummary";
import ConfirmModal from "../../../shared/components/confirmModal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import useOrders from "../hooks/useOrders";
import useAuth from "../../auth/hooks/useAuth";

const CheckoutPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Cash on Delivery");

  const Navigate = useNavigate();
  const { checkOutItems, clearCart, setCheckOutItems } = useCart();
  const { profile, updateProfile } = useAuth();
  const [address, setAddress] = useState(profile.address);
  const {
    totalItems,
    subTotalPrice,
    discountPercentage,
    discountAmount,
    taxAmount,
    totalPrice,
  } = calculateOrderSummary(checkOutItems);

  const shownItems = checkOutItems
    .slice(0, 3)
    .reduce((sum, item) => sum + item.quantity, 0);

  const remainingItems = totalItems - shownItems;

  const [showModal, setShowModal] = useState(false);
  const { placeOrder } = useOrders();
  const handlePlaceOrder = () => {
      if (!address.trim()) {
    alert("Please add your address in your profile before placing the order.");
    Navigate("/profile");
    return;
  }
    const order = {
      id: Date.now(),
      items: checkOutItems,
      name: profile.name,
      address: address,
      paymentMethod: selectedPaymentMethod,
      amount: totalPrice.toFixed(2),
      totalItems,
      status: "Placed",
      orderDate: new Date().toISOString(),
    };
    placeOrder(order);
    setCheckOutItems([]);
    clearCart();
    setShowModal(true);
  };
  const [editState, setEditState] = useState(false);
  const handleEdit = () => {
    setEditState(true);
  };
  const handleSaveAddress = () => {
    updateProfile({
      address,
    });

    setEditState(false);
  };
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? checkOutItems : checkOutItems.slice(0, 3);
  return (
    <main className="checkout-page">
      <div className="left-section">
        <div className="bill-address">
          <h4>
            Billing Address
            {!editState ? (
              <span className="edit-btn" onClick={() => setEditState(true)}>
                Edit
              </span>
            ) : (
              <span className="edit-btn" onClick={handleSaveAddress}>
                Save
              </span>
            )}
          </h4>
          <div className="address">
            <h5>{profile.name}</h5>
            {editState ? (
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            ) : (
              <p>{profile.address}</p>
            )}
          </div>
        </div>
        {/* <div className="ship-address">
          <h4> Shipping Address</h4>
          <div className="address">
            <h5>{profile.name}</h5>
            <p>{profile.address}</p>
          </div>
        </div> */}
        <div className="payment">
          <h4>Payment Method</h4>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                // defaultChecked
                checked={selectedPaymentMethod === "Cash on Delivery"}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>

            {/* <label>
              <input type="radio" name="payment" value="upi" />
              UPI
            </label> */}
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="summary">
          <h4> Order Summary ({totalItems} Items)</h4>
          <div>
            {/* {checkOutItems.slice(0, 3).map((item) => (
              <p key={item.id} className="summary-item">
                <span className="check-img">
                  <img src={item.image} />
                </span>
                <span> {item.title}</span>
                <span> X {item.quantity}</span>
              </p>
            ))}
            {checkOutItems.length > 3 && (
              <button type="button" className="view-all-btn">
                +{remainingItems} more items
              </button>
            )} */}
            {visibleItems.map((item) => (
              <p key={item.id} className="summary-item">
                <span className="check-img">
                  <img src={item.image} />
                </span>

                <span>{item.title}</span>

                <span>X {item.quantity}</span>
              </p>
            ))}

            {checkOutItems.length > 3 && (
              <button
                type="button"
                className="view-all-btn"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : `+${remainingItems} more items`}
              </button>
            )}
          </div>
        </div>
        <div className="pricing">
          <div className="cart-page-text">
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
        </div>
        {/* <button className="order-btn">Place Order</button> */}
        <div className="cart-page-actions">
          <button className="cart-page-btn" onClick={() => handlePlaceOrder()}>
            Place Order
          </button>
          <button className="cart-page-btn" onClick={() => Navigate("/cart")}>
            Edit Cart
          </button>
        </div>
        {showModal && (
          <ConfirmModal
            open={showModal}
            title="Order Confirm"
            message="Your Order has been placed."
            confirmText="Browse Books"
            cancelText="View Orders"
            orderModal={true}
            onConfirm={() => Navigate("/books")}
            onCancel={() => Navigate("/orders")}
          />
        )}
      </div>
    </main>
  );
};

export default CheckoutPage;
