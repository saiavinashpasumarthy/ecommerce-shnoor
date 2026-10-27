import { Link } from "react-router-dom";

import "../styles/Categories.css";

const categories = [
  {
    name: "Electronics",
    description:
      "Smart devices, audio accessories and everyday technology.",
    icon: "⌁",
    count: 3,
  },
  {
    name: "Fashion",
    description:
      "Everyday clothing and stylish essentials.",
    icon: "◇",
    count: 3,
  },
  {
    name: "Home & Living",
    description:
      "Simple products designed for comfortable living.",
    icon: "⌂",
    count: 3,
  },
  {
    name: "Beauty",
    description:
      "Everyday personal care and beauty essentials.",
    icon: "✦",
    count: 1,
  },
  {
    name: "Sports",
    description:
      "Workout and fitness essentials for an active lifestyle.",
    icon: "◉",
    count: 2,
  },
  {
    name: "Accessories",
    description:
      "Useful everyday accessories and lifestyle products.",
    icon: "◌",
    count: 4,
  },
];

export default function Categories() {
  const handleCategoryClick = (category) => {
    window.sessionStorage.setItem(
      "selectedCategory",
      category
    );
  };

  return (
    <div className="categories-page">

      <section className="categories-hero">
        <div className="container">

          <div className="categories-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Categories</span>
          </div>

          <div className="categories-hero-content">

            <span className="categories-eyebrow">
              SHNOOR COLLECTION
            </span>

            <h1>Shop by Category</h1>

            <p>
              Explore products across our carefully
              organized collections.
            </p>

          </div>

        </div>
      </section>

      <section className="categories-content">
        <div className="container">

          <div className="categories-grid">

            {categories.map((category) => (
              <Link
                key={category.name}
                to="/shop"
                className="category-card"
                onClick={() =>
                  handleCategoryClick(category.name)
                }
              >

                <div className="category-icon">
                  {category.icon}
                </div>

                <div className="category-info">

                  <div className="category-title-row">
                    <h2>{category.name}</h2>

                    <span className="category-arrow">
                      →
                    </span>
                  </div>

                  <p>
                    {category.description}
                  </p>

                  <span className="category-count">
                    {category.count}{" "}
                    {category.count === 1
                      ? "Product"
                      : "Products"}
                  </span>

                </div>

              </Link>
            ))}

          </div>

        </div>
      </section>

      <section className="categories-bottom">
        <div className="container">

          <div className="categories-bottom-card">

            <div>
              <span>
                SHNOOR INTERNATIONAL
              </span>

              <h2>
                Find something you'll love.
              </h2>

              <p>
                Browse the complete collection and
                discover your next favorite product.
              </p>
            </div>

            <Link
              to="/shop"
              className="categories-shop-button"
            >
              View All Products
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}