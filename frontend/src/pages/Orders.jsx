import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Orders.css";

export default function Orders() {
  const [orders] = useState(() => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("shnoor_orders")
        ) || []
      );
    } catch (error) {
      console.error(
        "Error loading orders:",
        error
      );

      return [];
    }
  });
  const [expandedOrder, setExpandedOrder] =
    useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const getPaymentLabel = (method) => {
    if (method === "cod") {
      return "Cash on Delivery";
    }

    return "Online Payment";
  };

  if (orders.length === 0) {
    return (
      <div className="orders-page">

        <section className="orders-header">
          <div className="container">

            <div className="orders-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Orders</span>
            </div>

            <div className="orders-title">
              <span>YOUR ACCOUNT</span>

              <h1>
                My Orders
              </h1>

              <p>
                Track and manage your SHNOOR orders.
              </p>
            </div>

          </div>
        </section>


        <section className="orders-empty-section">

          <div className="container">

            <div className="orders-empty">

              <div className="orders-empty-icon">
                ◇
              </div>

              <h2>
                No orders yet
              </h2>

              <p>
                You haven't placed any orders yet.
                Start exploring our collection.
              </p>

              <Link
                to="/shop"
                className="orders-shop-button"
              >
                Start Shopping
              </Link>

            </div>

          </div>

        </section>

      </div>
    );
  }

  return (
    <div className="orders-page">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="orders-header">

        <div className="container">

          <div className="orders-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>/</span>

            <span>
              Orders
            </span>

          </div>

          <div className="orders-title">

            <span>
              YOUR ACCOUNT
            </span>

            <h1>
              My Orders
            </h1>

            <p>
              Track and manage your SHNOOR orders.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          ORDERS
      ====================================================== */}

      <section className="orders-content">

        <div className="container">

          <div className="orders-topbar">

            <div>
              <h2>
                Order History
              </h2>

              <p>
                {orders.length}{" "}
                {orders.length === 1
                  ? "order"
                  : "orders"}{" "}
                placed
              </p>
            </div>

            <Link
              to="/shop"
              className="orders-continue-button"
            >
              Continue Shopping
            </Link>

          </div>


          <div className="orders-list">

            {orders.map((order) => {

              const isExpanded =
                expandedOrder === order.id;

              return (
                <article
                  className="order-card"
                  key={order.id}
                >

                  {/* =================================================
                      ORDER HEADER
                  ================================================== */}

                  <div className="order-card-header">

                    <div className="order-id-section">

                      <span>
                        ORDER ID
                      </span>

                      <strong>
                        {order.id}
                      </strong>

                    </div>


                    <div className="order-date-section">

                      <span>
                        ORDERED ON
                      </span>

                      <strong>
                        {formatDate(
                          order.createdAt
                        )}
                      </strong>

                      <small>
                        {formatTime(
                          order.createdAt
                        )}
                      </small>

                    </div>


                    <div className="order-status">

                      <span className="order-status-dot"></span>

                      {order.status}

                    </div>

                  </div>


                  {/* =================================================
                      ORDER SUMMARY
                  ================================================== */}

                  <div className="order-card-body">

                    <div className="order-products">

                      {order.items
                        .slice(0, 3)
                        .map((item) => (

                          <div
                            className="order-product"
                            key={item.productId}
                          >

                            <div className="order-product-image">

                              <span>
                                {item.name
                                  ? item.name
                                      .charAt(0)
                                      .toUpperCase()
                                  : "S"}
                              </span>

                            </div>

                            <div className="order-product-info">

                              <strong>
                                {item.name}
                              </strong>

                              <span>
                                Qty:{" "}
                                {item.quantity}
                              </span>

                            </div>

                          </div>

                        ))}


                      {order.items.length > 3 && (
                        <div className="more-products">
                          +{order.items.length - 3} more
                        </div>
                      )}

                    </div>


                    <div className="order-total-section">

                      <span>
                        ORDER TOTAL
                      </span>

                      <strong>
                        ₹
                        {Number(
                          order.total
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>

                  </div>


                  {/* =================================================
                      EXPANDED DETAILS
                  ================================================== */}

                  {isExpanded && (
                    <div className="order-expanded">

                      <div className="order-expanded-section">

                        <h3>
                          Items
                        </h3>

                        <div className="expanded-items">

                          {order.items.map(
                            (item) => (

                              <div
                                className="expanded-item"
                                key={
                                  item.productId
                                }
                              >

                                <div>
                                  <strong>
                                    {item.name}
                                  </strong>

                                  <span>
                                    ₹
                                    {Number(
                                      item.price
                                    ).toLocaleString(
                                      "en-IN"
                                    )}{" "}
                                    ×{" "}
                                    {item.quantity}
                                  </span>
                                </div>

                                <strong>
                                  ₹
                                  {(
                                    Number(
                                      item.price
                                    ) *
                                    item.quantity
                                  ).toLocaleString(
                                    "en-IN"
                                  )}
                                </strong>

                              </div>

                            )
                          )}

                        </div>

                      </div>


                      <div className="order-expanded-grid">

                        <div className="order-expanded-section">

                          <h3>
                            Delivery Address
                          </h3>

                          <p>
                            {order.customer.firstName}{" "}
                            {order.customer.lastName}
                          </p>

                          <p>
                            {order.customer.address}
                          </p>

                          <p>
                            {order.customer.city},{" "}
                            {order.customer.state}
                          </p>

                          <p>
                            PIN:{" "}
                            {order.customer.pincode}
                          </p>

                          <p>
                            Phone:{" "}
                            {order.customer.phone}
                          </p>

                        </div>


                        <div className="order-expanded-section">

                          <h3>
                            Payment
                          </h3>

                          <p>
                            {getPaymentLabel(
                              order.paymentMethod
                            )}
                          </p>

                          <div className="order-price-breakdown">

                            <div>
                              <span>
                                Subtotal
                              </span>

                              <strong>
                                ₹
                                {Number(
                                  order.subtotal
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </strong>
                            </div>

                            <div>
                              <span>
                                Delivery
                              </span>

                              <strong>
                                {order.deliveryCharge ===
                                0
                                  ? "FREE"
                                  : `₹${order.deliveryCharge}`}
                              </strong>
                            </div>

                            <div className="breakdown-total">

                              <span>
                                Total
                              </span>

                              <strong>
                                ₹
                                {Number(
                                  order.total
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </strong>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>
                  )}


                  {/* =================================================
                      ACTION
                  ================================================== */}

                  <div className="order-card-footer">

                    <button
                      className="view-order-button"
                      onClick={() =>
                        setExpandedOrder(
                          isExpanded
                            ? null
                            : order.id
                        )
                      }
                    >
                      {isExpanded
                        ? "Hide Details"
                        : "View Details"}
                    </button>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>

    </div>
  );
}