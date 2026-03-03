import { create } from "zustand";

const useProductStore = create((set) => ({
  // Product state
  products: [],
  currentProduct: null,
  total: 0,
  isLoading: false,
  isSubmitting: false,
  error: null,

  // Product state setter
  setProducts: (products) => set({ products }),
  setCurrentProduct: (currentProduct) => set({ currentProduct }),
  setTotal: (total) => set({ total }),
  setLoading: (isLoading) => set({ isLoading }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setError: (error) => set({ error }),
  clearCurrentProduct: () => set({ currentProduct: null }),
}));

export { useProductStore };
