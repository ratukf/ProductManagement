import {
  Box,
  CircularProgress,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { getAllProduct } from "../action/productAction";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const { products, isLoading } = useProductStore();
  const [search, setSearch] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    getAllProduct({});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getAllProduct({ search });
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  if (isLoading) return <CircularProgress />;

  return (
    <Box>
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
      />
      {products?.map((item, index) => (
        <Box
          key={item.id}
          onClick={() => {
            nav(`/product/${item.id}`);
          }}
        >
          <Typography variant="h6">{index + 1}</Typography>
          <Typography variant="body1">{item.title}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProductsPage;
