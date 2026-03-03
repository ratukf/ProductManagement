import {
  Alert,
  Box,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import { getAllProduct, deleteProduct } from "../action/productAction";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { PageHeader } from "../components/PageHeader";
import { ActionButtons } from "../components/ActionButtons";
import { FilterToolbar } from "../components/FilterToolbar";

const LIMIT = 10;

const ProductsPage = () => {
  const { products, total, isLoading, isSubmitting } = useProductStore();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const nav = useNavigate();
  const isFirstRender = useRef(true); // Render flag

  // Fetch all products when first rendered
  useEffect(() => {
    getAllProduct({ sortBy, order });
  }, []);

  // Re-fetch on search change (debounced)
  useEffect(() => {
    // Return if not first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Use debounce for search
    const timer = setTimeout(() => {
      setPage(1);
      getAllProduct({ search, skip: 0, sortBy, order });
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Handle sort
  const handleSortByChange = (e) => {
    const val = e.target.value;
    setSortBy(val);
    setPage(1);
    getAllProduct({ search, skip: 0, sortBy: val, order });
  };

  // Handle order sort
  const handleOrderChange = (e) => {
    const val = e.target.value;
    setOrder(val);
    setPage(1);
    getAllProduct({ search, skip: 0, sortBy, order: val });
  };

  // Handle pagination
  const handlePageChange = (_, value) => {
    setPage(value);
    getAllProduct({ search, skip: (value - 1) * LIMIT, sortBy, order });
  };

  // Handle delete product
  const handleDelete = async () => {
    const result = await deleteProduct({ id: deleteTarget.id });
    if (result.success) setDeleteTarget(null);
  };

  return (
    <Box sx={{ minWidth: 0 }}>
      <PageHeader title="List" />

      {/* Search + Sort By + Order + Add button */}
      <FilterToolbar
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
        order={order}
        onOrderChange={handleOrderChange}
        onAdd={() => nav("/products/add")}
        addLabel="Add Product"
      />

      {/* Products table */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell width={50}>No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell width={120}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <CircularProgress size={32} />
                </TableCell>
              </TableRow>
            ) : products?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No products found
                  </Typography>
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
                    <ActionButtons
                      onView={() => nav(`/products/${item.id}`)}
                      onDelete={() => setDeleteTarget(item)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Pagination
          count={Math.ceil(total / LIMIT)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>

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
