const getProducts = async () => {
  try {
    const response = await fetch("/api/products");
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export { getProducts };