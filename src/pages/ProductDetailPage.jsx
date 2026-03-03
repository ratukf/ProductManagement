import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useProductStore } from "../store/productStore";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getProductById } from "../action/productAction";
import { DeleteOutline, Edit } from "@mui/icons-material";

const ProductDetailPage = () => {
  const { currentProduct, isLoading } = useProductStore();
  const { id } = useParams();
  const nav = useNavigate();

  // Fetch product by id
  useEffect(() => {
    if (id) getProductById({ id });
  }, [id]);

  // Edge case if loading or product is empty
  if (isLoading) return <CircularProgress />;
  if (!currentProduct) return null;

  return (
    <Box>
      {/* Action button */}
      <Button variant="outlined" onClick={() => nav("/products")}>
        Back
      </Button>
      <Button
        variant="contained"
        startIcon={<Edit />}
        onClick={() => nav(`/products/${id}/edit`)}
      >
        Edit
      </Button>
      <IconButton>
        <DeleteOutline />
      </IconButton>

      {/* Product detail */}
      <Typography variant="h4">{currentProduct.title}</Typography>
      <Typography variant="body1">Brand: {currentProduct.brand}</Typography>
      <Typography variant="body1">
        Category: {currentProduct.category}
      </Typography>
      <Typography variant="body1">Price: ${currentProduct.price}</Typography>
      <Typography variant="body1">Stock: {currentProduct.stock}</Typography>
      <Typography variant="body1">Rating: {currentProduct.rating}</Typography>
      <Typography variant="body1">{currentProduct.description}</Typography>
    </Box>
  );
};

export default ProductDetailPage;
