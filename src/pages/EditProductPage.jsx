import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "../store/productStore";
import { getProductById } from "../action/productAction";
import { ProductForm } from "../components/ProductForm";

const EditProductPage = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { currentProduct, isLoading } = useProductStore();

  useEffect(() => {
    if (id) getProductById({ id });
  }, [id]);

  if (isLoading) return <CircularProgress />;
  if (!currentProduct) return null;

  return (
    <Box>
      <Button variant="outlined" onClick={() => nav(`/products/${id}`)}>
        Back
      </Button>
      <Typography variant="h5">Edit Product</Typography>
      <ProductForm
        initialValues={currentProduct}
        onSuccess={() => nav(`/products/${id}`)}
      />
    </Box>
  );
};

export default EditProductPage;
