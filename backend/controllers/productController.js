const products = [
  {
    id: "P001",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 1499,
    description:
      "Comfortable wireless headphones with clear audio and long-lasting battery life.",
    rating: 4.5,
    stock: 25,
  },

  {
    id: "P002",
    name: "Smart Watch Series X",
    category: "Electronics",
    price: 2499,
    description:
      "Modern smartwatch with fitness tracking, notifications and everyday activity monitoring.",
    rating: 4.4,
    stock: 18,
  },

  {
    id: "P003",
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 1199,
    description:
      "Compact portable speaker designed for clear sound at home or outdoors.",
    rating: 4.3,
    stock: 32,
  },

  {
    id: "P004",
    name: "Classic Cotton T-Shirt",
    category: "Fashion",
    price: 699,
    description:
      "Comfortable everyday cotton T-shirt with a clean and versatile design.",
    rating: 4.2,
    stock: 50,
  },

  {
    id: "P005",
    name: "Premium Casual Shirt",
    category: "Fashion",
    price: 1299,
    description:
      "Smart casual shirt suitable for everyday wear and semi-formal occasions.",
    rating: 4.5,
    stock: 28,
  },

  {
    id: "P006",
    name: "Minimalist Backpack",
    category: "Fashion",
    price: 1599,
    description:
      "Spacious everyday backpack with a minimalist design and multiple compartments.",
    rating: 4.6,
    stock: 20,
  },

  {
    id: "P007",
    name: "Ceramic Coffee Mug",
    category: "Home & Living",
    price: 399,
    description:
      "Minimal ceramic coffee mug designed for everyday use.",
    rating: 4.1,
    stock: 60,
  },

  {
    id: "P008",
    name: "Modern Table Lamp",
    category: "Home & Living",
    price: 999,
    description:
      "Elegant table lamp that adds a warm and modern touch to your workspace.",
    rating: 4.4,
    stock: 22,
  },

  {
    id: "P009",
    name: "Scented Candle Set",
    category: "Home & Living",
    price: 799,
    description:
      "Set of scented candles designed to create a relaxing atmosphere.",
    rating: 4.3,
    stock: 35,
  },

  {
    id: "P010",
    name: "Daily Face Care Kit",
    category: "Beauty",
    price: 899,
    description:
      "Simple daily skincare essentials for a clean and refreshed routine.",
    rating: 4.2,
    stock: 24,
  },

  {
    id: "P011",
    name: "Fitness Resistance Bands",
    category: "Sports",
    price: 599,
    description:
      "Portable resistance bands suitable for home workouts and strength training.",
    rating: 4.5,
    stock: 40,
  },

  {
    id: "P012",
    name: "Yoga Mat",
    category: "Sports",
    price: 899,
    description:
      "Comfortable non-slip yoga mat suitable for yoga, stretching and workouts.",
    rating: 4.6,
    stock: 30,
  },

  {
    id: "P013",
    name: "Stainless Steel Water Bottle",
    category: "Accessories",
    price: 749,
    description:
      "Reusable stainless steel bottle designed to keep beverages fresh throughout the day.",
    rating: 4.5,
    stock: 45,
  },

  {
    id: "P014",
    name: "Classic Analog Watch",
    category: "Accessories",
    price: 1899,
    description:
      "Classic analog watch with a clean dial and timeless everyday design.",
    rating: 4.4,
    stock: 15,
  },

  {
    id: "P015",
    name: "Everyday Sunglasses",
    category: "Accessories",
    price: 999,
    description:
      "Lightweight sunglasses with a simple everyday frame design.",
    rating: 4.2,
    stock: 26,
  },

  {
    id: "P016",
    name: "Laptop Sleeve 15.6 Inch",
    category: "Accessories",
    price: 899,
    description:
      "Protective laptop sleeve with a lightweight design suitable for daily commuting.",
    rating: 4.5,
    stock: 34,
  },
];

const getProducts = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const product = products.find(
    (item) => item.id === req.params.id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
};

export {
  getProducts,
  getProductById,
};