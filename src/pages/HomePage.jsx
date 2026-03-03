import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Add,
  Inventory,
  TrendingDown,
  Warning,
  Star,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useProductStore } from "../store/productStore";
import { getAllProduct } from "../action/productAction";

const StatCard = ({ icon, label, value, sub, color = "text.primary" }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            {label}
          </Typography>
          <Typography variant="h5" fontWeight={700} color={color}>
            {value}
          </Typography>
          {sub && <Typography variant="caption">{sub}</Typography>}
        </Box>
        <Box sx={{ color, opacity: 0.7, mt: 0.5 }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

const HomePage = () => {
  const { user } = useAuthStore();
  const { products, total, isLoading } = useProductStore();
  const nav = useNavigate();

  useEffect(() => {
    getAllProduct({ limit: 100, skip: 0 });
  }, []);

  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 20).length;
  const avgRating = products.length
    ? (
        products.reduce((sum, p) => sum + (p.rating ?? 0), 0) / products.length
      ).toFixed(1)
    : "—";

  const recent = [...products].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Greeting */}
      <Box>
        <Typography variant="h5">
          Welcome {user?.firstName} {user?.lastName}
        </Typography>
      </Box>

      {/* Stat cards */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={32} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <StatCard label="Total Products" value={total} />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard
              label="Out of Stock"
              value={outOfStock}
              color={outOfStock > 0 ? "error.main" : "text.primary"}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard
              label="Low Stock"
              value={lowStock}
              color={lowStock > 0 ? "warning.main" : "text.primary"}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard label="Avg. Rating" value={avgRating} />
          </Grid>
        </Grid>
      )}

      {/* Quick actions */}
      <Card>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Quick Actions
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => nav("/products/add")}
            >
              Add Product
            </Button>
            <Button
              variant="outlined"
              startIcon={<Inventory />}
              onClick={() => nav("/products")}
            >
              View All Porducts
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Recent products */}
      {!isLoading && recent.length > 0 && (
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1">Recent Products</Typography>
              <Button size="small" onClick={() => nav("/products")}>
                View all
              </Button>
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <TableContainer>
                <Table sx={{ minWidth: 500 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        Category
                      </TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Stock</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recent.map((item) => (
                      <TableRow
                        key={item.id}
                        onClick={() => nav(`/products/${item.id}`)}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell>{item.title}</TableCell>
                        <TableCell
                          sx={{ display: { xs: "none", sm: "table-cell" } }}
                        >
                          {item.category}
                        </TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell
                          sx={{
                            color:
                              item.stock === 0
                                ? "error.main"
                                : item.stock < 20
                                  ? "warning.main"
                                  : "text.primary",
                            fontWeight: item.stock < 20 ? 600 : 400,
                          }}
                        >
                          {item.stock === 0 ? "Out" : item.stock}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default HomePage;
