import { productService } from "../services/productService";
import { useProductStore } from "../store/productStore";

// Get all products
const getAllProduct = async ({
  search = "",
  limit = 10,
  skip = 0,
  sortBy = "title",
  order = "asc",
}) => {
  const { setLoading, setError, setProducts } = useProductStore.getState();

  //   Set products state while loading
  setLoading(true);
  setError(null);

  try {
    const data = await productService.getAll({
      limit,
      search,
      skip,
      sortBy,
      order,
    });
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

// Get one product by id
const getProductById = async ({ id }) => {
  const { setLoading, setError, setCurrentProduct } =
    useProductStore.getState();

  setLoading(true);
  setError(null);

  try {
    const data = await productService.getById({ id });
    // Set product and loading state while success
    setCurrentProduct(data);
    setLoading(false);
    return { success: true };
  } catch (err) {
    setError(err.response?.data?.message || "Failed to fetch product");
    setLoading(false);
    return { success: false };
  }
};

export { getAllProduct, getProductById };
