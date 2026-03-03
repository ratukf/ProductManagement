import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { FormField } from "./FormField";
import { useProductForm } from "../hooks/useProductForm";

const ProductForm = ({ initialValues = null, onSuccess }) => {
  const { formik, isSubmitting, error } = useProductForm({
    initialValues,
    onSuccess,
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <FormField formik={formik} name="title" label="Title" />
      <FormField
        formik={formik}
        name="description"
        label="Description"
        multiline
        rows={3}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <FormField formik={formik} name="price" label="Price" type="number" />
        <FormField formik={formik} name="stock" label="Stock" type="number" />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <FormField formik={formik} name="brand" label="Brand" />
        <FormField formik={formik} name="category" label="Category" />
      </Box>
      <Box>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? (
            <CircularProgress size={20} color="inherit" />
          ) : initialValues ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export { ProductForm };
