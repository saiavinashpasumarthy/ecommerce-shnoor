import { Link } from "react-router-dom";

import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* =========================
            COMPANY
        ========================= */}

        <div className="footer-column footer-company">

          <div className="footer-logo">
            <div className="footer-logo-mark">
              S
            </div>

            <div>
              <div className="footer-logo-name">
                SHNOOR
              </div>

              <div className="footer-logo-subtitle">
                INTERNATIONAL
              </div>
            </div>
          </div>

          <p className="footer-description">
            A modern digital commerce experience
            built for SHNOOR.
          </p>

        </div>

        {/* =========================
            QUICK LINKS
        ========================= */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/wishlist">Wishlist</Link>

        </div>

        {/* =========================
            CUSTOMER
        ========================= */}

        <div className="footer-column">

          <h3>Customer</h3>

          <Link to="/login">Login</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/profile">My Profile</Link>

        </div>

        {/* =========================
            SUPPORT
        ========================= */}

        <div className="footer-column">

          <h3>Support</h3>

          <a href="mailto:support@shnoor.com">
            Contact Us
          </a>

          <a href="#">
            Shipping Information
          </a>

          <a href="#">
            Returns & Refunds
          </a>

          <a href="#">
            Privacy Policy
          </a>

        </div>

      </div>

      {/* =========================
          BOTTOM
      ========================= */}

      <div className="footer-bottom">

        <div className="footer-bottom-container">

          <p>
            © {new Date().getFullYear()} SHNOOR.
            All rights reserved.
          </p>

          <p>
            Built with MERN Stack
          </p>

        </div>

      </div>

    </footer>
  );
}