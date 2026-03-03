import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Alert,
  Divider,
} from "@mui/material";
import { useLoginForm } from "../hooks/useLoginForm";
import { FormField } from "../components/FormField";

const LoginPage = () => {
  const { formik, isLoading, error, showPassword, toggleShowPassword } =
    useLoginForm();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Sign in to your account to continue
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormField
              formik={formik}
              name="username"
              label="Username"
              autoComplete="username"
            />
            <FormField
              formik={formik}
              name="password"
              label="Password"
              type="password"
              showPassword={showPassword}
              onTogglePassword={toggleShowPassword}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>

          <Divider sx={{ my: 2.5 }} />

          <Box sx={{ bgcolor: "background.default", borderRadius: 2, p: 1.5 }}>
            <Typography variant="caption" color="text.secondary">
              Demo credentials: <strong>emilys</strong> /{" "}
              <strong>emilyspass</strong>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
