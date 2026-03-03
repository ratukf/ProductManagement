import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/products/:id/edit" element={<EditProductPage />} />
        <Route path="/products/add" element={<AddProductPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
