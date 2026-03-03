import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { DeleteOutline, Edit, Star } from "@mui/icons-material";
import { useProductStore } from "../store/productStore";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProduct, getProductById } from "../action/productAction";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { PageHeader } from "../components/PageHeader";

const StatCell = ({ label, value, sub }) => (
  <Box>
    <Typography variant="subtitle2" gutterBottom>
      {label}
    </Typography>
    <Typography variant="body1" fontWeight={600}>
      {value}
    </Typography>
    {sub && <Typography variant="caption">{sub}</Typography>}
  </Box>
);

const ReviewCard = ({ review }) => (
  <Box
    sx={{
      py: 1.5,
      borderBottom: "1px solid",
      borderColor: "divider",
      "&:last-child": { border: 0 },
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
      <Typography variant="subtitle2">{review.reviewerName}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Star sx={{ fontSize: 14, color: "warning.main" }} />
        <Typography variant="caption">{review.rating}/5</Typography>
      </Box>
    </Box>
    <Typography variant="body2" color="text.secondary">
      {review.comment}
    </Typography>
    <Typography variant="caption" color="text.disabled">
      {new Date(review.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </Typography>
  </Box>
);

const ProductDetailPage = () => {
  const { currentProduct: p, isLoading, isSubmitting } = useProductStore();
  const { id } = useParams();
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) getProductById({ id });
  }, [id]);

  const handleDelete = async () => {
    const result = await deleteProduct({ id });
    if (result.success) nav("/products");
  };

  if (isLoading) return <CircularProgress />;
  if (!p) return null;

  const images = p.images?.length ? p.images : [p.thumbnail];
  const discountedPrice = p.discountPercentage
    ? (p.price * (1 - p.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <Box>
      <PageHeader
        title={p.title}
        backTo="/products"
        actions={
          <>
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => nav(`/products/${id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutline />}
              onClick={() => setIsModalOpen(true)}
            >
              Delete
            </Button>
          </>
        }
      />

      <Grid container spacing={3}>
        {/* IMAGES */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardMedia
              component="img"
              image={images[activeImage]}
              alt={p.title}
              sx={{
                height: 300,
                objectFit: "contain",
                bgcolor: "background.default",
                p: 2,
              }}
            />
            {images.length > 1 && (
              <Box sx={{ display: "flex", gap: 1, p: 2, flexWrap: "wrap" }}>
                {images.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    onClick={() => setActiveImage(i)}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: 1,
                      cursor: "pointer",
                      border: "2px solid",
                      borderColor:
                        i === activeImage ? "primary.main" : "transparent",
                      opacity: i === activeImage ? 1 : 0.6,
                      transition: "all 0.15s",
                      "&:hover": { opacity: 1 },
                    }}
                  />
                ))}
              </Box>
            )}
          </Card>
        </Grid>

        {/* PRODUCT DEETAIL */}
        <Grid item xs={12} md={7}>
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                  <Chip
                    label={p.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  {p.brand && (
                    <Chip label={p.brand} size="small" variant="outlined" />
                  )}
                  {p.tags?.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      color="default"
                    />
                  ))}
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {p.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                    <Typography variant="h5" fontWeight={700}>
                      ${discountedPrice ?? p.price}
                    </Typography>
                    {discountedPrice && (
                      <>
                        <Typography
                          variant="body2"
                          sx={{ textDecoration: "line-through" }}
                          color="text.disabled"
                        >
                          ${p.price}
                        </Typography>
                        <Chip
                          label={`-${p.discountPercentage}%`}
                          size="small"
                          color="success"
                        />
                      </>
                    )}
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <StatCell
                      label="Rating"
                      value={`${p.rating} / 5`}
                      sub="⭐ avg score"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <StatCell
                      label="Stock"
                      value={p.stock}
                      sub={p.availabilityStatus}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <StatCell
                      label="Min. Order"
                      value={p.minimumOrderQuantity}
                      sub="units"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <StatCell label="SKU" value={p.sku ?? "—"} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Logistics & Policy
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <StatCell
                      label="Shipping"
                      value={p.shippingInformation ?? "—"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StatCell
                      label="Warranty"
                      value={p.warrantyInformation ?? "—"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StatCell
                      label="Return Policy"
                      value={p.returnPolicy ?? "—"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StatCell
                      label="Dimensions"
                      value={
                        p.dimensions
                          ? `${p.dimensions.width} × ${p.dimensions.height} × ${p.dimensions.depth} cm`
                          : "—"
                      }
                      sub={p.weight ? `${p.weight} kg` : undefined}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* PRODUCT REVIEW */}
      {p.reviews?.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Reviews ({p.reviews.length})
            </Typography>
            {p.reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </CardContent>
        </Card>
      )}

      <ConfirmDialog
        open={isModalOpen}
        title="Delete Product"
        description={`Are you sure you want to delete "${p.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        isLoading={isSubmitting}
      />
    </Box>
  );
};

export default ProductDetailPage;
