import React from "react";
import useCart from "../../../features/cart/hooks/useCart";
import "./ConfirmModal.css";

const ConfirmModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  orderModal = false,
}) => {
  const { clearCart } = useCart();
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-actions">
          <button
            className={`btn ${orderModal ? "btn-primary" : "btn-danger"}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>

          <button className={`btn ${orderModal ? "" : "btn-primary"}`} onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
