import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getProducts } from "../services/productService";
import "../styles/ProductDetails.css";
import {useCart} from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const products = await getProducts();

        const foundProduct = products.find(
          (item) =>
            String(item._id || item.id) === String(id)
        );

        if (!foundProduct) {
          setError("Product not found.");
          return;
        }

        setProduct(foundProduct);
      } catch (err) {
        console.error("Error loading product:", err);
        setError(
          "Unable to load this product right now."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };
  const handleAddToCart = () => {
  addToCart(product, quantity);
};

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="product-details-state">
            <div className="product-details-spinner"></div>

            <p>Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page">
        <div className="container">
          <div className="product-details-state">

            <div className="product-state-icon">
              !
            </div>

            <h2>
              {error || "Product not found"}
            </h2>

            <p>
              The product you're looking for could not
              be found.
            </p>

            <Link
              to="/shop"
              className="back-to-shop-button"
            >
              ← Back to Shop
            </Link>

          </div>
        </div>
      </div>
    );
  }

  const price = Number(product.price || 0);

  const productInitial = product.name
    ? product.name.charAt(0).toUpperCase()
    : "S";

  return (
    <div className="product-details-page">

      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <section className="product-breadcrumb-section">
        <div className="container">

          <div className="product-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>/</span>

            <Link to="/shop">
              Shop
            </Link>

            <span>/</span>

            <span>
              {product.name}
            </span>

          </div>

        </div>
      </section>


      {/* =====================================================
          PRODUCT DETAILS
      ====================================================== */}

      <section className="product-main-section">
        <div className="container">

          <div className="product-details-layout">

            {/* PRODUCT IMAGE */}

            <div className="product-details-gallery">

              <div className="product-main-image">

                <div className="product-main-placeholder">
                  <span>
                    {productInitial}
                  </span>
                </div>

                <span className="product-featured-label">
                  SHNOOR
                </span>

              </div>

            </div>


            {/* PRODUCT INFORMATION */}

            <div className="product-information">

              <span className="product-details-category">
                {product.category || "SHNOOR"}
              </span>

              <h1>
                {product.name}
              </h1>

              <div className="product-rating">

                <div className="stars">
                  ★★★★★
                </div>

                <span>
                  Customer favorite
                </span>

              </div>

              <div className="product-price">
                ₹
                {price.toLocaleString("en-IN")}
              </div>

              <div className="product-divider"></div>

              <div className="product-description">

                <h3>
                  Product Description
                </h3>

                <p>
                  {product.description ||
                    "Discover quality and convenience with this SHNOOR product. Designed to provide a reliable and seamless everyday experience."}
                </p>

              </div>


              {/* STOCK */}

              <div className="stock-status">

                <span className="stock-dot"></span>

                <span>
                  In stock and available
                </span>

              </div>


              {/* QUANTITY */}

              <div className="quantity-section">

                <label>
                  Quantity
                </label>

                <div className="quantity-control">

                  <button
                    onClick={decreaseQuantity}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="product-actions">

                <button
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>

                <button
                  className="buy-now-button"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>

                <button
                  className={`product-detail-wishlist ${
                    isWishlisted
                      ? "wishlisted"
                      : ""
                  }`}
                  onClick={() =>
                    setIsWishlisted(
                      (current) => !current
                    )
                  }
                  aria-label="Add to wishlist"
                >
                  {isWishlisted ? "♥" : "♡"}
                </button>

              </div>


              {/* PRODUCT BENEFITS */}

              <div className="product-benefits">

                <div className="product-benefit">

                  <div className="benefit-small-icon">
                    ✓
                  </div>

                  <div>
                    <strong>
                      Quality assured
                    </strong>

                    <span>
                      Carefully selected products
                    </span>
                  </div>

                </div>


                <div className="product-benefit">

                  <div className="benefit-small-icon">
                    ↗
                  </div>

                  <div>
                    <strong>
                      Fast delivery
                    </strong>

                    <span>
                      Reliable doorstep delivery
                    </span>
                  </div>

                </div>


                <div className="product-benefit">

                  <div className="benefit-small-icon">
                    ◆
                  </div>

                  <div>
                    <strong>
                      Secure payment
                    </strong>

                    <span>
                      Safe and protected checkout
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          INFORMATION SECTION
      ====================================================== */}

      <section className="product-extra-section">
        <div className="container">

          <div className="product-extra-grid">

            <div className="product-extra-card">

              <span className="extra-number">
                01
              </span>

              <h3>
                Quality First
              </h3>

              <p>
                We focus on bringing dependable products
                together in one convenient shopping
                experience.
              </p>

            </div>


            <div className="product-extra-card">

              <span className="extra-number">
                02
              </span>

              <h3>
                Simple Shopping
              </h3>

              <p>
                Browse, choose, and order with a clean
                and straightforward experience.
              </p>

            </div>


            <div className="product-extra-card">

              <span className="extra-number">
                03
              </span>

              <h3>
                Customer Focused
              </h3>

              <p>
                Designed around convenience and reliable
                support throughout your purchase.
              </p>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}