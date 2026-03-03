import { Box, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "../components/ProductForm";
import { PageHeader } from "../components/PageHeader";

const AddProductPage = () => {
  const nav = useNavigate();

  return (
    <Box>
      <PageHeader title="Add Product" backTo="/products" />
      <Card>
        <CardContent>
          <ProductForm onSuccess={() => nav("/products")} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddProductPage;
