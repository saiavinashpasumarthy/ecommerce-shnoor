import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <h1>You're not signed in</h1>

          <p>
            Sign in to view your profile.
          </p>

          <Link
            to="/login"
            className="profile-primary-button"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const memberSince = new Date(
    user.createdAt
  ).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-page">

      <div className="container">

        <div className="profile-header">
          <div>
            <span className="profile-eyebrow">
              MY ACCOUNT
            </span>

            <h1>Profile</h1>

            <p>
              Manage your SHNOOR account.
            </p>
          </div>
        </div>

        <div className="profile-grid">

          <section className="profile-card profile-main-card">

            <div className="profile-avatar">
              {user.firstName?.charAt(0).toUpperCase()}
              {user.lastName?.charAt(0).toUpperCase()}
            </div>

            <h2>
              {user.firstName} {user.lastName}
            </h2>

            <p className="profile-email">
              {user.email}
            </p>

            <span className="profile-member">
              Member since {memberSince}
            </span>

          </section>

          <section className="profile-card">

            <div className="profile-card-header">
              <h2>Personal Information</h2>
            </div>

            <div className="profile-info">

              <div>
                <span>First Name</span>
                <strong>{user.firstName}</strong>
              </div>

              <div>
                <span>Last Name</span>
                <strong>{user.lastName}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{user.email}</strong>
              </div>

              <div>
                <span>Mobile</span>
                <strong>{user.phone}</strong>
              </div>

            </div>

          </section>

          <section className="profile-card">

            <div className="profile-card-header">
              <h2>Quick Actions</h2>
            </div>

            <div className="profile-actions">

              <Link
                to="/orders"
                className="profile-action"
              >
                <span>📦</span>
                <div>
                  <strong>My Orders</strong>
                  <small>
                    View your order history
                  </small>
                </div>
              </Link>

              <Link
                to="/shop"
                className="profile-action"
              >
                <span>🛍️</span>
                <div>
                  <strong>Continue Shopping</strong>
                  <small>
                    Explore SHNOOR products
                  </small>
                </div>
              </Link>

            </div>

          </section>

          <section className="profile-card profile-danger-card">

            <div>
              <h2>Account</h2>

              <p>
                Sign out of your SHNOOR account
                on this device.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="profile-logout-button"
            >
              Logout
            </button>

          </section>

        </div>

      </div>

    </div>
  );
}