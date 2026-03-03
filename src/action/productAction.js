import { productService } from "../services/productService";
import { useProductStore } from "../store/productStore";

const getAllProduct = async () => {
  const { setLoading, setError, setProducts } = useProductStore.getState();

  //   Set products state while loading
  setLoading(true);
  setError(null);

  try {
    const data = await productService.getAll();
    // Set products and loading state while success
    setProducts(data.products);
    setLoading(false);
    return { success: true };
  } catch (err) {
    // Set error and loading state if failed
    setError(err.response?.data?.message || "Failed to fetch products");
    setLoading(false);
    return { success: false };
  }
};

export { getAllProduct };
