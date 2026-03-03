import { create } from "zustand";

const useProductStore = create((set) => ({
  // Product state
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,

  // Product state setter
  setProducts: (products) => set({ products }),
  setCurrentProduct: (currentProduct) => set({ currentProduct }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (isError) => set({ isError }),
}));

export { useProductStore };
