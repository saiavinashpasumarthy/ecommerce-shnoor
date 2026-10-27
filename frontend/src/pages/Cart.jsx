import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

import "../styles/Cart.css";

export default function Cart() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const deliveryCharge =
    cartSubtotal > 999 || cartSubtotal === 0
      ? 0
      : 99;

  const total = cartSubtotal + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">

        <section className="cart-header">
          <div className="container">

            <div className="cart-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Cart</span>
            </div>

            <div className="cart-title-section">
              <span>YOUR SHOPPING BAG</span>
              <h1>Shopping Cart</h1>
            </div>

          </div>
        </section>

        <section className="cart-empty-section">
          <div className="container">

            <div className="empty-cart">

              <div className="empty-cart-icon">
                🛒
              </div>

              <h2>Your cart is empty</h2>

              <p>
                Looks like you haven't added anything
                to your cart yet.
              </p>

              <Link
                to="/shop"
                className="continue-shopping-button"
              >
                Continue Shopping
              </Link>

            </div>

          </div>
        </section>

      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="cart-header">
        <div className="container">

          <div className="cart-breadcrumb">
            <Link to="/">Home</Link>

            <span>/</span>

            <span>Cart</span>
          </div>

          <div className="cart-title-section">

            <span>YOUR SHOPPING BAG</span>

            <h1>Shopping Cart</h1>

            <p>
              {cartCount}{" "}
              {cartCount === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          CART CONTENT
      ====================================================== */}

      <section className="cart-content">
        <div className="container">

          <div className="cart-layout">

            {/* =================================================
                CART ITEMS
            ================================================== */}

            <div className="cart-items-section">

              <div className="cart-items-header">

                <h2>
                  Cart Items
                </h2>

                <button
                  className="clear-cart-button"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>

              </div>


              <div className="cart-items">

                {cartItems.map((item) => (

                  <article
                    className="cart-item"
                    key={item.productId}
                  >

                    {/* IMAGE */}

                    <Link
                      to={`/product/${item.productId}`}
                      className="cart-item-image"
                    >

                      <div className="cart-item-placeholder">
                        <span>
                          {item.name
                            ? item.name
                                .charAt(0)
                                .toUpperCase()
                            : "S"}
                        </span>
                      </div>

                    </Link>


                    {/* INFORMATION */}

                    <div className="cart-item-info">

                      <span className="cart-item-category">
                        {item.category}
                      </span>

                      <Link
                        to={`/product/${item.productId}`}
                        className="cart-item-name"
                      >
                        {item.name}
                      </Link>

                      {item.description && (
                        <p>
                          {item.description}
                        </p>
                      )}

                      <div className="cart-item-price-mobile">
                        ₹
                        {Number(
                          item.price
                        ).toLocaleString("en-IN")}
                      </div>

                    </div>


                    {/* PRICE */}

                    <div className="cart-item-unit-price">

                      <span>
                        Unit Price
                      </span>

                      <strong>
                        ₹
                        {Number(
                          item.price
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>


                    {/* QUANTITY */}

                    <div className="cart-item-quantity">

                      <span>
                        Quantity
                      </span>

                      <div className="cart-quantity-control">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.productId
                            )
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <strong>
                          {item.quantity}
                        </strong>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.productId
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                      </div>

                    </div>


                    {/* TOTAL */}

                    <div className="cart-item-total">

                      <span>
                        Total
                      </span>

                      <strong>
                        ₹
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>


                    {/* REMOVE */}

                    <button
                      className="remove-cart-item"
                      onClick={() =>
                        removeFromCart(
                          item.productId
                        )
                      }
                      aria-label={`Remove ${item.name}`}
                    >
                      ×
                    </button>

                  </article>

                ))}

              </div>


              {/* CONTINUE SHOPPING */}

              <Link
                to="/shop"
                className="continue-shopping-link"
              >
                ← Continue Shopping
              </Link>

            </div>


            {/* =================================================
                ORDER SUMMARY
            ================================================== */}

            <aside className="cart-summary">

              <div className="cart-summary-header">
                <h2>
                  Order Summary
                </h2>
              </div>


              <div className="summary-row">

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


              <div className="summary-row">

                <span>
                  Delivery
                </span>

                <strong>
                  {deliveryCharge === 0
                    ? "FREE"
                    : `₹${deliveryCharge}`}
                </strong>

              </div>


              {cartSubtotal > 0 &&
                cartSubtotal < 999 && (
                  <div className="delivery-note">
                    Add ₹
                    {(
                      999 - cartSubtotal
                    ).toLocaleString(
                      "en-IN"
                    )}{" "}
                    more for free delivery.
                  </div>
                )}


              <div className="summary-divider"></div>


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


              <Link
                to="/checkout"
                className="checkout-button"
              >
                Proceed to Checkout
              </Link>


              <div className="secure-checkout">

                <span>
                  ✓
                </span>

                <p>
                  Secure checkout and protected
                  payment
                </p>

              </div>

            </aside>

          </div>

        </div>
      </section>

    </div>
  );
}