import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import { getAllProduct, deleteProduct } from "../action/productAction";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useRef } from "react";

const LIMIT = 10;

const ProductsPage = () => {
  const { products, total, isLoading, isSubmitting, error } = useProductStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const nav = useNavigate();
  const isFirstRender = useRef(true); // Render flag

  // Fetch all products when first rendered
  useEffect(() => {
    getAllProduct({});
  }, []);

  useEffect(() => {
    // Return if not first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Use debounce for search
    const timer = setTimeout(() => {
      setPage(1);
      getAllProduct({ search, skip: 0 });
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Handle pagination
  const handlePageChange = (_, value) => {
    setPage(value);
    getAllProduct({ search, skip: (value - 1) * LIMIT });
  };

  // Handle delete product
  const handleDelete = async () => {
    const result = await deleteProduct({ id: deleteTarget.id });
    if (result.success) setDeleteTarget(null);
  };

  return (
    <Box>
      {/* Fallback if error is occuring */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Search field & add product button */}
      <Box>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          size="small"
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => nav("/products/add")}
        >
          Add Product
        </Button>
      </Box>

      {/* Products list */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            products?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{(page - 1) * LIMIT + index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>
                  <IconButton onClick={() => nav(`/products/${item.id}`)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => nav(`/products/${item.id}/edit`)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => setDeleteTarget(item)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(total / LIMIT)}
        page={page}
        onChange={handlePageChange}
      />

      {/* Delete confirm modal */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isSubmitting}
      />
    </Box>
  );
};

export default ProductsPage;
