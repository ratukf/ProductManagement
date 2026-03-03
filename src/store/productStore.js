import { create } from "zustand";

const useProductStore = create((set) => ({
  // Product state
  products: [],
  isLoading: false,
  error: null,

  // Product state setter
  setProducts: (products) => set({ products }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (isError) => set({ isError }),
}));

export { useProductStore };
