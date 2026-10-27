import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProducts } from "../services/productService";
import "../styles/Home.css";
const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Smart devices & accessories",
    icon: "◉",
  },
  {
    id: 2,
    name: "Fashion",
    description: "Style for every occasion",
    icon: "◇",
  },
  {
    id: 3,
    name: "Home & Living",
    description: "Make your space better",
    icon: "⌂",
  },
  {
    id: 4,
    name: "Accessories",
    description: "Complete your everyday look",
    icon: "○",
  },
];

const benefits = [
  {
    id: 1,
    icon: "✓",
    title: "Quality Products",
    description: "Carefully selected products made for everyday use.",
  },
  {
    id: 2,
    icon: "↗",
    title: "Fast Delivery",
    description: "Reliable delivery with updates from order to doorstep.",
  },
  {
    id: 3,
    icon: "◆",
    title: "Secure Payments",
    description: "Your payment information stays protected.",
  },
  {
    id: 4,
    icon: "24",
    title: "Customer Support",
    description: "We're here to help whenever you need us.",
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoadingProducts(true);
        setProductError("");

        const data = await getProducts();

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProductError("Unable to load products right now.");
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-page">

      {/* =========================================================
          HERO SECTION
      ========================================================== */}

      <section className="hero-section">
        <div className="container hero-container">

          <div className="hero-content">

            <span className="hero-eyebrow">
              SHNOOR INTERNATIONAL
            </span>

            <h1>
              Everything you need,
              <span> all in one place.</span>
            </h1>

            <p className="hero-description">
              Discover quality products, modern essentials, and
              everyday favorites — all in one seamless shopping
              experience.
            </p>

            <div className="hero-actions">
              <Link to="/shop" className="primary-button">
                Shop Now
                <span>→</span>
              </Link>

              <Link to="/categories" className="secondary-button">
                Explore Categories
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <strong>100%</strong>
                <span>Secure Shopping</span>
              </div>

              <div className="trust-divider"></div>

              <div className="trust-item">
                <strong>24/7</strong>
                <span>Customer Support</span>
              </div>

              <div className="trust-divider"></div>

              <div className="trust-item">
                <strong>Fast</strong>
                <span>Delivery</span>
              </div>
            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-orbit hero-orbit-one"></div>
            <div className="hero-orbit hero-orbit-two"></div>

            <div className="hero-glow"></div>

            <div className="hero-card hero-card-main">

              <div className="hero-card-top">
                <span>SHNOOR</span>
                <span className="hero-card-dot"></span>
              </div>

              <div className="hero-symbol">
                <div className="hero-symbol-navy"></div>
                <div className="hero-symbol-orange"></div>
              </div>

              <div className="hero-card-bottom">
                <span>MODERN</span>
                <span>ESSENTIALS</span>
              </div>

            </div>

            <div className="floating-card floating-card-top">
              <span className="floating-icon">✦</span>
              <div>
                <strong>Premium</strong>
                <small>Shopping experience</small>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <span className="floating-icon">✓</span>
              <div>
                <strong>Trusted</strong>
                <small>Quality products</small>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          CATEGORIES
      ========================================================== */}

      <section className="categories-section">
        <div className="container">

          <div className="section-heading">

            <div>
              <span className="section-eyebrow">
                SHOP BY CATEGORY
              </span>

              <h2>
                Find what you're looking for
              </h2>
            </div>

            <Link
              to="/categories"
              className="view-all-link"
            >
              View All
              <span>→</span>
            </Link>

          </div>

          <div className="categories-grid">

            {categories.map((category) => (
              <Link
                to="/shop"
                className="category-card"
                key={category.id}
              >

                <div className="category-icon">
                  {category.icon}
                </div>

                <div className="category-content">
                  <h3>{category.name}</h3>

                  <p>{category.description}</p>

                  <span className="category-arrow">
                    Explore →
                  </span>
                </div>

              </Link>
            ))}

          </div>

        </div>
      </section>


      {/* =========================================================
          FEATURED PRODUCTS
      ========================================================== */}

      <section className="featured-section">
        <div className="container">

          <div className="section-heading">

            <div>
              <span className="section-eyebrow">
                FEATURED COLLECTION
              </span>

              <h2>
                Popular products
              </h2>
            </div>

            <Link
              to="/shop"
              className="view-all-link"
            >
              View All Products
              <span>→</span>
            </Link>

          </div>


          {loadingProducts ? (

            <div className="products-loading">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>

          ) : productError ? (

            <div className="products-message">
              <p>{productError}</p>

              <Link
                to="/shop"
                className="small-primary-button"
              >
                Browse Shop
              </Link>
            </div>

          ) : featuredProducts.length === 0 ? (

            <div className="products-message">
              <div className="empty-product-icon">
                ◇
              </div>

              <h3>Products coming soon</h3>

              <p>
                Our featured collection will appear here.
              </p>
            </div>

          ) : (

            <div className="products-grid">

              {featuredProducts.map((product, index) => (

                <article
                  className="home-product-card"
                  key={product._id || product.id || index}
                >

                  <div className="product-image-container">

                    <div className="product-placeholder">
                      <span>
                        {product.name
                          ? product.name.charAt(0).toUpperCase()
                          : "S"}
                      </span>
                    </div>

                    <button
                      className="product-wishlist"
                      aria-label={`Add ${
                        product.name || "product"
                      } to wishlist`}
                    >
                      ♡
                    </button>

                    {index === 0 && (
                      <span className="product-badge">
                        Featured
                      </span>
                    )}

                  </div>

                  <div className="product-card-content">

                    <span className="product-category">
                      {product.category || "SHNOOR"}
                    </span>

                    <h3>
                      {product.name || "Product Name"}
                    </h3>

                    <div className="product-card-footer">

                      <strong>
                        ₹
                        {Number(product.price || 0).toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                      <button
                        className="add-product-button"
                        aria-label={`Add ${
                          product.name || "product"
                        } to cart`}
                      >
                        +
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>
      </section>


      {/* =========================================================
          PROMOTIONAL BANNER
      ========================================================== */}

      <section className="promo-section">
        <div className="container">

          <div className="promo-banner">

            <div className="promo-content">

              <span className="promo-eyebrow">
                SHNOOR EXCLUSIVE
              </span>

              <h2>
                Upgrade your everyday.
              </h2>

              <p>
                Discover products designed to bring quality,
                convenience, and style into your daily life.
              </p>

              <Link
                to="/shop"
                className="promo-button"
              >
                Start Shopping
                <span>→</span>
              </Link>

            </div>

            <div className="promo-decoration">

              <div className="promo-circle promo-circle-one"></div>
              <div className="promo-circle promo-circle-two"></div>

              <div className="promo-symbol">
                <div className="promo-symbol-navy"></div>
                <div className="promo-symbol-orange"></div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          WHY SHNOOR
      ========================================================== */}

      <section className="benefits-section">
        <div className="container">

          <div className="benefits-heading">
            <span className="section-eyebrow">
              WHY SHNOOR
            </span>

            <h2>
              Shopping made simple.
            </h2>

            <p>
              Everything you need for a smooth and reliable
              online shopping experience.
            </p>
          </div>

          <div className="benefits-grid">

            {benefits.map((benefit) => (

              <div
                className="benefit-card"
                key={benefit.id}
              >

                <div className="benefit-icon">
                  {benefit.icon}
                </div>

                <h3>
                  {benefit.title}
                </h3>

                <p>
                  {benefit.description}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================== */}

      <section className="final-cta-section">
        <div className="container">

          <div className="final-cta">

            <div>
              <span className="section-eyebrow">
                READY TO SHOP?
              </span>

              <h2>
                Your next favorite product is waiting.
              </h2>
            </div>

            <Link
              to="/shop"
              className="final-cta-button"
            >
              Explore Shop
              <span>→</span>
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}