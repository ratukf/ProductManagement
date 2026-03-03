import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useProductStore } from "../store/productStore";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProduct, getProductById } from "../action/productAction";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { ConfirmDialog } from "../components/ConfirmDialog";

const ProductDetailPage = () => {
  const { currentProduct, isLoading, isSubmitting } = useProductStore();
  const { id } = useParams();
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch product by id
  useEffect(() => {
    if (id) getProductById({ id });
  }, [id]);

  // Handle delete product
  const handleDelete = async () => {
    const result = await deleteProduct({ id: id });
    if (result.success) nav("/products");
  };

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
      <IconButton onClick={() => setIsModalOpen(true)}>
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

      {/* Delete confirm modal */}
      <ConfirmDialog
        open={isModalOpen}
        title="Delete Product"
        description={`Are you sure you want to delete "${currentProduct?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        isLoading={isSubmitting}
      />
    </Box>
  );
};

export default ProductDetailPage;
