import { productService } from "../services/productService";
import { useProductStore } from "../store/productStore";
import { useSnackbarStore } from "../store/snackbarStore";

const { show } = useSnackbarStore.getState();

// Get all products
const getAllProduct = async ({
  search = "",
  limit = 10,
  skip = 0,
  sortBy = "title",
  order = "asc",
}) => {
  const { setLoading, setError, setProducts, setTotal } =
    useProductStore.getState();

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
    setTotal(data.total);
    setLoading(false);
    return { success: true };
  } catch (err) {
    // Set error and loading state if failed
    setError(err.response?.data?.message || "Failed to fetch products");
    setLoading(false);
    show(
      `Failed to get products data: ${err.response?.data?.message}`,
      "error",
    );
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
    show(`Failed to get product data: ${err.response?.data?.message}`, "error");
    return { success: false };
  }
};

// Create new product
const createProduct = async ({ payload }) => {
  const { setSubmitting, setError, setProducts, setTotal } =
    useProductStore.getState();

  setSubmitting(true);
  setError(null);

  try {
    const data = await productService.create({ payload });
    const { products, total } = useProductStore.getState();
    setProducts([data, ...products]);
    setTotal(total + 1);
    setSubmitting(false);
    show("New product sucessfully added");
    return { success: true, data };
  } catch (err) {
    setError(err.response?.data?.message || "Failed to create product");
    setSubmitting(false);
    show(
      `Failed to create new product: ${err.response?.data?.message}`,
      "error",
    );
    return { success: false };
  }
};

// Update new product
const updateProduct = async ({ id, payload }) => {
  const { setSubmitting, setError, setCurrentProduct, setProducts } =
    useProductStore.getState();

  setSubmitting(true);
  setError(null);

  try {
    const data = await productService.update({ id, payload });
    const { products } = useProductStore.getState();
    setProducts(products.map((p) => (p.id === Number(id) ? data : p)));
    setCurrentProduct(data);
    setSubmitting(false);
    show("Product's data has been succesfully updated");
    return { success: true, data };
  } catch (err) {
    setError(err.response?.data?.message || "Failed to update product");
    setSubmitting(false);
    show(
      `Failed to update product's data: ${err.response?.data?.message}`,
      "error",
    );
    return { success: false };
  }
};

// Delete one product
const deleteProduct = async ({ id }) => {
  const { setSubmitting, setError, setProducts, setTotal } =
    useProductStore.getState();

  setSubmitting(true);
  setError(null);

  try {
    await productService.remove({ id });
    const { products, total } = useProductStore.getState();
    setProducts(products.filter((p) => p.id !== Number(id)));
    setTotal(total - 1);
    setSubmitting(false);
    show("Product has been succesfully deleted");
    return { success: true };
  } catch (err) {
    setError(err.response?.data?.message || "Failed to delete product");
    setSubmitting(false);
    show(
      `Failed to delete the product: ${err.response?.data?.message}`,
      "error",
    );
    return { success: false };
  }
};

export {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
