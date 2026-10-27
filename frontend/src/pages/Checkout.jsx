import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import {
  createPaymentOrder,
  verifyPayment,
} from "../services/paymentService";

import "../styles/Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartSubtotal,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const deliveryCharge = useMemo(() => {
    return cartSubtotal >= 999 ? 0 : 99;
  }, [cartSubtotal]);

  const total =
    cartSubtotal + deliveryCharge;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim()
    ) {
      return "Please enter your full name.";
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      return "Please enter a valid email address.";
    }

    if (
      !/^[6-9]\d{9}$/.test(
        formData.phone
      )
    ) {
      return "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.address.trim()) {
      return "Please enter your address.";
    }

    if (!formData.city.trim()) {
      return "Please enter your city.";
    }

    if (!formData.state.trim()) {
      return "Please enter your state.";
    }

    if (
      !/^\d{6}$/.test(
        formData.pincode
      )
    ) {
      return "Please enter a valid 6-digit PIN code.";
    }

    return "";
  };

  const saveOrder = ({
    paymentMethod,
    paymentId = null,
    razorpayOrderId = null,
  }) => {
    const order = {
      id: `SHN-${Date.now()}`,

      customer: formData,

      items: cartItems,

      subtotal: cartSubtotal,

      deliveryCharge,

      total,

      paymentMethod,

      paymentId,

      razorpayOrderId,

      paymentStatus:
        paymentMethod === "cod"
          ? "Pending"
          : "Paid",

      createdAt:
        new Date().toISOString(),

      status: "Placed",
    };

    const existingOrders =
      JSON.parse(
        localStorage.getItem(
          "shnoor_orders"
        )
      ) || [];

    const updatedOrders = [
      order,
      ...existingOrders,
    ];

    localStorage.setItem(
      "shnoor_orders",
      JSON.stringify(updatedOrders)
    );

    localStorage.setItem(
      "shnoor_last_order",
      JSON.stringify(order)
    );

    clearCart();

    navigate("/orders");
  };

  const handleCodOrder = () => {
    saveOrder({
      paymentMethod: "cod",
    });
  };

  const handleOnlinePayment = async () => {
    try {
      setLoading(true);
      setError("");

      const paymentOrder =
        await createPaymentOrder(total);

      const razorpayOrder =
        paymentOrder.order;

      if (
        !window.Razorpay
      ) {
        throw new Error(
          "Razorpay Checkout could not be loaded."
        );
      }

      const options = {
        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency,

        name:
          "SHNOOR International",

        description:
          "E-commerce Order Payment",

        order_id:
          razorpayOrder.id,

        prefill: {
          name:
            `${formData.firstName} ${formData.lastName}`,

          email:
            formData.email,

          contact:
            formData.phone,
        },

        theme: {
          color: "#0B1F3A",
        },

        handler:
          async function (response) {
            try {
              setLoading(true);

              const verification =
                await verifyPayment({
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                });

              if (
                verification.success
              ) {
                saveOrder({
                  paymentMethod:
                    "online",

                  paymentId:
                    response.razorpay_payment_id,

                  razorpayOrderId:
                    response.razorpay_order_id,
                });
              }
            } catch (error) {
              console.error(
                "Payment verification error:",
                error
              );

              setError(
                error.message ||
                  "Payment verification failed."
              );
            } finally {
              setLoading(false);
            }
          },

        modal: {
          ondismiss:
            function () {
              setLoading(false);
            },
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment failed:",
            response.error
          );

          setError(
            response.error
              ?.description ||
              "Payment failed. Please try again."
          );

          setLoading(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Online payment error:",
        error
      );

      setError(
        error.message ||
          "Unable to start online payment."
      );

      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!cartItems.length) {
      setError(
        "Your cart is empty."
      );
      return;
    }

    setError("");

    if (
      paymentMethod === "cod"
    ) {
      handleCodOrder();
      return;
    }

    await handleOnlinePayment();
  };

  if (!cartItems.length) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-empty">
            <h2>
              Your cart is empty
            </h2>

            <p>
              Add some products before
              proceeding to checkout.
            </p>

            <Link
              to="/shop"
              className="checkout-button"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">

        <div className="checkout-breadcrumb">
          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <Link to="/cart">
            Cart
          </Link>

          <span>/</span>

          <span>Checkout</span>
        </div>

        <div className="checkout-header">
          <span>
            SHNOOR INTERNATIONAL
          </span>

          <h1>
            Checkout
          </h1>

          <p>
            Complete your details and
            place your order.
          </p>
        </div>

        {error && (
          <div className="checkout-error">
            {error}
          </div>
        )}

        <form
          className="checkout-layout"
          onSubmit={handleSubmit}
        >

          <div className="checkout-main">

            <section className="checkout-section">

              <div className="section-heading">
                <span>01</span>

                <div>
                  <h2>
                    Contact Information
                  </h2>

                  <p>
                    Enter your contact details.
                  </p>
                </div>
              </div>

              <div className="checkout-grid">

                <div className="checkout-field">
                  <label>
                    First Name
                  </label>

                  <input
                    name="firstName"
                    value={
                      formData.firstName
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>
                    Last Name
                  </label>

                  <input
                    name="lastName"
                    value={
                      formData.lastName
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    maxLength="10"
                    value={
                      formData.phone
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

              </div>

            </section>

            <section className="checkout-section">

              <div className="section-heading">
                <span>02</span>

                <div>
                  <h2>
                    Delivery Address
                  </h2>

                  <p>
                    Where should we deliver
                    your order?
                  </p>
                </div>
              </div>

              <div className="checkout-grid">

                <div className="checkout-field checkout-field-full">
                  <label>
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={
                      formData.address
                    }
                    onChange={
                      handleChange
                    }
                    rows="3"
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>
                    City
                  </label>

                  <input
                    name="city"
                    value={
                      formData.city
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>
                    State
                  </label>

                  <input
                    name="state"
                    value={
                      formData.state
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>
                    PIN Code
                  </label>

                  <input
                    name="pincode"
                    maxLength="6"
                    value={
                      formData.pincode
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

              </div>

            </section>

            <section className="checkout-section">

              <div className="section-heading">
                <span>03</span>

                <div>
                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Select how you want
                    to pay.
                  </p>
                </div>
              </div>

              <div className="payment-methods">

                <label
                  className={
                    paymentMethod === "cod"
                      ? "payment-option selected"
                      : "payment-option"
                  }
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={
                      paymentMethod ===
                      "cod"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "cod"
                      )
                    }
                  />

                  <div>
                    <strong>
                      Cash on Delivery
                    </strong>

                    <span>
                      Pay when your order
                      arrives.
                    </span>
                  </div>
                </label>

                <label
                  className={
                    paymentMethod ===
                    "online"
                      ? "payment-option selected"
                      : "payment-option"
                  }
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={
                      paymentMethod ===
                      "online"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "online"
                      )
                    }
                  />

                  <div>
                    <strong>
                      Online Payment
                    </strong>

                    <span>
                      Pay securely using
                      Razorpay.
                    </span>
                  </div>
                </label>

              </div>

            </section>

          </div>

          <aside className="checkout-summary">

            <h2>
              Order Summary
            </h2>

            <div className="checkout-items">

              {cartItems.map(
                (item) => (
                  <div
                    className="checkout-item"
                    key={item.productId}
                  >
                    <div>
                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        Qty:{" "}
                        {item.quantity}
                      </span>
                    </div>

                    <strong>
                      ₹
                      {(
                        Number(
                          item.price
                        ) *
                        Number(
                          item.quantity
                        )
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>
                )
              )}

            </div>

            <div className="summary-line">
              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {cartSubtotal.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <div className="summary-line">
              <span>
                Delivery
              </span>

              <strong>
                {deliveryCharge ===
                0
                  ? "FREE"
                  : `₹${deliveryCharge}`}
              </strong>
            </div>

            <div className="summary-total">
              <span>
                Total
              </span>

              <strong>
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <button
              type="submit"
              className="checkout-button"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : paymentMethod ===
                  "online"
                ? "Pay Now"
                : "Place Order"}
            </button>

            <Link
              to="/cart"
              className="back-to-cart"
            >
              ← Back to Cart
            </Link>

          </aside>

        </form>
      </div>
    </div>
  );
}