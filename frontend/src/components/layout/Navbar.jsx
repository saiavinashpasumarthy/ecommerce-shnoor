import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

import logo from "../../assets/shnoor-logo.svg";

import "../../styles/Navbar.css";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMobileMenu}
        >
          <img
            src={logo}
            alt="SHNOOR"
            className="shnoor-logo"
          />

          <div className="logo-text">
            <span className="logo-name">
              SHNOOR
            </span>

            <span className="logo-subtitle">
              INTERNATIONAL
            </span>
          </div>
        </Link>

        <nav className="desktop-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Categories
          </NavLink>
        </nav>

        <div className="navbar-actions">

          <button
            className="nav-icon-button"
            aria-label="Search"
          >
            <span>⌕</span>
          </button>

          <Link
            to="/wishlist"
            className="nav-icon-button"
            aria-label="Wishlist"
          >
            ♡
          </Link>

          <Link
            to="/cart"
            className="nav-icon-button cart-button"
            aria-label="Shopping cart"
          >
            🛒

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="navbar-user">

              <Link
                to="/profile"
                className="navbar-user-name"
              >
                Hi, {user.firstName}
              </Link>

              <button
                className="navbar-logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              className="login-button"
            >
              Login
            </Link>
          )}

        </div>

        <button
          className="mobile-menu-button"
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">

          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="mobile-nav-link"
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            onClick={closeMobileMenu}
            className="mobile-nav-link"
          >
            Shop
          </NavLink>

          <NavLink
            to="/categories"
            onClick={closeMobileMenu}
            className="mobile-nav-link"
          >
            Categories
          </NavLink>

          <NavLink
            to="/wishlist"
            onClick={closeMobileMenu}
            className="mobile-nav-link"
          >
            Wishlist
          </NavLink>

          <NavLink
            to="/cart"
            onClick={closeMobileMenu}
            className="mobile-nav-link"
          >
            Cart
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                onClick={closeMobileMenu}
                className="mobile-nav-link"
              >
                My Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="mobile-login-button"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={closeMobileMenu}
              className="mobile-login-button"
            >
              Login
            </NavLink>
          )}

        </div>
      )}
    </header>
  );
}