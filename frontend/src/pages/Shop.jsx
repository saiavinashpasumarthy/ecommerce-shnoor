import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";

import "../styles/Shop.css";

export default function Shop() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState(() => {
    return (
      window.sessionStorage.getItem(
        "selectedCategory"
      ) || "All"
    );
  });

  const [sort, setSort] = useState("default");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading products:", err);

        setError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    window.sessionStorage.removeItem(
      "selectedCategory"
    );
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = products
      .map((product) => product.category)
      .filter(Boolean);

    return ["All", ...new Set(uniqueCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* Search */
    if (search.trim()) {
      const searchTerm = search
        .toLowerCase()
        .trim();

      result = result.filter((product) => {
        const name = String(
          product.name || ""
        ).toLowerCase();

        const description = String(
          product.description || ""
        ).toLowerCase();

        const productCategory = String(
          product.category || ""
        ).toLowerCase();

        return (
          name.includes(searchTerm) ||
          description.includes(searchTerm) ||
          productCategory.includes(searchTerm)
        );
      });
    }

    /* Category */
    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    /* Sorting */
    if (sort === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price || 0) -
          Number(b.price || 0)
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price || 0) -
          Number(a.price || 0)
      );
    }

    if (sort === "name") {
      result.sort((a, b) =>
        String(a.name || "").localeCompare(
          String(b.name || "")
        )
      );
    }

    return result;
  }, [
    products,
    search,
    category,
    sort,
  ]);

  const handleAddToCart = (
    event,
    product
  ) => {
    event.preventDefault();
    event.stopPropagation();

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: 1,
    });
  };

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Wishlist functionality will be connected
    // when we build the Wishlist module.
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("default");

    window.sessionStorage.removeItem(
      "selectedCategory"
    );
  };

  return (
    <div className="shop-page">

      {/* Header */}
      <section className="shop-header">
        <div className="container">

          <div className="shop-breadcrumb">
            <Link to="/">Home</Link>

            <span>/</span>

            <span>Shop</span>
          </div>

          <div className="shop-header-content">

            <div>
              <span className="shop-eyebrow">
                SHNOOR COLLECTION
              </span>

              <h1>Shop</h1>

              <p>
                Explore our collection of products
                designed for everyday living.
              </p>
            </div>

            {!loading && !error && (
              <div className="product-count">
                <strong>
                  {filteredProducts.length}
                </strong>

                <span>
                  {filteredProducts.length === 1
                    ? "Product"
                    : "Products"}
                </span>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* Shop Content */}
      <section className="shop-content">
        <div className="container">

          {/* Toolbar */}
          <div className="shop-toolbar">

            <div className="search-box">

              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

              {search && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}

            </div>

            <div className="shop-controls">

              <select
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target.value
                  )
                }
                className="shop-select"
              >
                {categories.map((item) => (
                  <option
                    value={item}
                    key={item}
                  >
                    {item === "All"
                      ? "All Categories"
                      : item}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="shop-select"
              >
                <option value="default">
                  Sort: Default
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="name">
                  Name: A to Z
                </option>
              </select>

            </div>

          </div>

          {/* Active Category */}
          {category !== "All" && (
            <div className="active-category">

              <span>
                Showing:
              </span>

              <strong>
                {category}
              </strong>

              <button
                type="button"
                onClick={() =>
                  setCategory("All")
                }
              >
                ×
              </button>

            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="shop-state">

              <div className="shop-spinner"></div>

              <p>
                Loading products...
              </p>

            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="shop-state shop-error">

              <div className="state-icon">
                !
              </div>

              <h3>
                Something went wrong
              </h3>

              <p>
                {error}
              </p>

              <button
                type="button"
                className="retry-button"
                onClick={() =>
                  window.location.reload()
                }
              >
                Try Again
              </button>

            </div>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <div className="shop-state">

                <div className="state-icon">
                  ◇
                </div>

                <h3>
                  No products found
                </h3>

                <p>
                  Try changing your search or
                  category filter.
                </p>

                <button
                  type="button"
                  className="retry-button"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>

              </div>
            )}

          {/* Products */}
          {!loading &&
            !error &&
            filteredProducts.length > 0 && (
              <div className="shop-product-grid">

                {filteredProducts.map(
                  (product) => (
                    <Link
                      to={`/product/${product.id}`}
                      className="shop-product-card"
                      key={product.id}
                    >

                      {/* Product Image */}
                      <div className="shop-product-image">

                        <div className="shop-product-placeholder">
                          <span>
                            {product.name
                              ? product.name
                                  .charAt(0)
                                  .toUpperCase()
                              : "S"}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="shop-wishlist-button"
                          aria-label={`Add ${product.name} to wishlist`}
                          onClick={
                            handleWishlist
                          }
                        >
                          ♡
                        </button>

                      </div>

                      {/* Product Information */}
                      <div className="shop-product-info">

                        <span className="shop-product-category">
                          {product.category ||
                            "SHNOOR"}
                        </span>

                        <h2>
                          {product.name ||
                            "Product Name"}
                        </h2>

                        {product.description && (
                          <p>
                            {product.description}
                          </p>
                        )}

                        <div className="shop-product-rating">
                          <span>
                            ★
                          </span>

                          <span>
                            {product.rating ||
                              "4.5"}
                          </span>
                        </div>

                        <div className="shop-product-bottom">

                          <strong>
                            ₹
                            {Number(
                              product.price || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                          <button
                            type="button"
                            className="shop-add-button"
                            onClick={(event) =>
                              handleAddToCart(
                                event,
                                product
                              )
                            }
                          >
                            Add to Cart
                          </button>

                        </div>

                      </div>

                    </Link>
                  )
                )}

              </div>
            )}

        </div>
      </section>

    </div>
  );
}