import React, { useState } from "react";
import "./OrdersPage.css";
import Loader from "../../../shared/components/loader/Loader";
import useOrders from "../hooks/useOrders";
import useAuth from "../../auth/hooks/useAuth";
import ProfileForm from "../../auth/components/ProfileForm";

const OrdersPage = () => {
  const { profile } = useAuth();

  const formatOrderDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };
  const { orders } = useOrders();

  if (orders.length == 0)
    return (
      <div className="empty-order">
        <h2>📦 My Orders</h2>
        <p>{orders.length} Orders • Last updated Today</p>
      </div>
    );
  const [expandedOrders, setExpandedOrders] = useState({});
  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };
  const [showAll, setShowAll] = useState(false);

  return (
    <main className="orders-page">
      <div className="orders-header">
        <h2>📦 My Orders</h2>
        <p>{orders.length} Orders • Last updated Today</p>
      </div>

      <div className="orders-list">
        {orders.map((order) => {
          const visibleItems = expandedOrders[order.id]
            ? order.items
            : order.items.slice(0, 2);

          return (
            <div className="order-card" key={order.id}>
              <div className="order-top">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>
                    {formatOrderDate(order.orderDate)} • {order.paymentMethod}
                  </p>
                  <h5>{order.name}</h5>
                  <p>Address: {order.address}</p>
                </div>

                <span
                  className={`status ${
                    order.status === "Delivered" ? "delivered" : "placed"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {visibleItems.map((item) => (
                  <div className="order-item" key={item.id}>
                    <span>📚 {item.title}</span>
                    <span>
                      Qty: {item.quantity} • ₹{item.price}
                    </span>
                  </div>
                ))}

                {order.items.length > 2 && (
                  <button
                    className="more-btn"
                    onClick={() => toggleOrder(order.id)}
                  >
                    {expandedOrders[order.id]
                      ? "Show Less"
                      : `+${order.items.length - 2} more items`}
                  </button>
                )}
              </div>

              <div className="order-summary">
                <span>Total Items : {order.totalItems}</span>
                <span>Total Amount : ₹{order.amount}</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default OrdersPage;
