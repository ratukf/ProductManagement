import { api } from "../utils/api";

const productService = {
  getAll: async ({ search = "" }) => {
    if (search) {
      const res = await api.get(`/products/search?q=${search}`);
      return res.data;
    }
    const res = await api.get("/products");
    return res.data;
  },
};

export { productService };
