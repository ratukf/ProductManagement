import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "../components/ProductForm";

const AddProductPage = () => {
  const nav = useNavigate();

  return (
    <Box>
      <Button variant="outlined" onClick={() => nav("/products")}>
        Back
      </Button>
      <Typography variant="h5">Add Product</Typography>
      <ProductForm onSuccess={() => nav("/products")} />
    </Box>
  );
};

export default AddProductPage;
