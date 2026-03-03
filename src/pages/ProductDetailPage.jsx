import { Box, CircularProgress, Typography } from "@mui/material";
import { useProductStore } from "../store/productStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProductById } from "../action/productAction";

const ProductDetailPage = () => {
  const { currentProduct, isLoading } = useProductStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) getProductById({ id });
  }, [id]);

  if (isLoading) return <CircularProgress />;
  if (!currentProduct) return null;

  return (
    <Box>
      <Typography>{currentProduct.title}</Typography>
      <Typography>{currentProduct.description}</Typography>
      <Typography>{currentProduct.price}</Typography>
      <Typography>{currentProduct.rating}</Typography>
    </Box>
  );
};

export default ProductDetailPage;
