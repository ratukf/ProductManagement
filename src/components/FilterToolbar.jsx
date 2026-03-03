import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const SORT_OPTIONS = [
  { label: "Title", value: "title" },
  { label: "Stock", value: "stock" },
  { label: "Price", value: "price" },
];

const ORDER_OPTIONS = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

const FilterToolbar = ({
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
  order,
  onOrderChange,
  onAdd,
  addLabel = "Add",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 1.5,
        mb: 2,
      }}
    >
      <TextField
        value={search}
        onChange={onSearchChange}
        placeholder="Search products..."
        sx={{ width: { xs: "100%", sm: 220 } }}
      />

      <FormControl sx={{ width: { xs: "100%", sm: 130 } }}>
        <InputLabel>Sort by</InputLabel>
        <Select value={sortBy} label="Sort by" onChange={onSortByChange}>
          {SORT_OPTIONS.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: { xs: "100%", sm: 130 } }}>
        <InputLabel>Order</InputLabel>
        <Select value={order} label="Order" onChange={onOrderChange}>
          {ORDER_OPTIONS.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {onAdd && (
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onAdd}
          sx={{ ml: { sm: "auto" } }}
        >
          {addLabel}
        </Button>
      )}
    </Box>
  );
};

export { FilterToolbar };
