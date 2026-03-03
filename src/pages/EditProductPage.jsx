import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "../store/productStore";
import { getProductById } from "../action/productAction";
import { ProductForm } from "../components/ProductForm";
import { PageHeader } from "../components/PageHeader";

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
      <PageHeader title="Edit Product" backTo={`/products/${id}`} />
      <Card>
        <CardContent>
          <ProductForm
            initialValues={currentProduct}
            onSuccess={() => nav(`/products/${id}`)}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProductPage;
