import { create } from "zustand";

const useSnackbarStore = create((set) => ({
  open: false,
  message: "",
  severity: "success", // "success" | "error" | "warning" | "info"
  show: (message, severity = "success") =>
    set({ open: true, message, severity }),
  hide: () => set({ open: false }),
}));

export { useSnackbarStore };
