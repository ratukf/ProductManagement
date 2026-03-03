import { api } from "../utils/api";

const productService = {
  // Get all products
  getAll: async ({
    search = "",
    limit = 10,
    skip = 0,
    sortBy = "title",
    order = "asc",
  }) => {
    if (search) {
      const res = await api.get(
        `/products/search?q=${search}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`,
      );
      return res.data;
    }
    const res = await api.get(
      `/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`,
    );
    return res.data;
  },
  // Get one product by id
  getById: async ({ id }) => {
    const res = await api.get(`products/${id}`);
    return res.data;
  },
  // Create new product
  create: async ({ payload }) => {
    const res = await api.post("/products/add", payload);
    return res.data;
  },

  // Update product by id
  update: async ({ id, payload }) => {
    const res = await api.put(`/products/${id}`, payload);
    return res.data;
  },

  // Delete product by id
  remove: async ({ id }) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};

export { productService };
