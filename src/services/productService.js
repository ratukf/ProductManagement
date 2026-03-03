import { api } from "../utils/api";

const productService = {
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
};

export { productService };
