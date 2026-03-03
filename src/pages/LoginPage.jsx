import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import { useLoginForm } from "../hooks/useLoginForm";
import { FormField } from "../components/FormField";

const LoginPage = () => {
  const { formik, isLoading, error, showPassword, toggleShowPassword } =
    useLoginForm();

  return (
    <Box>
      <Card>
        <CardContent>
          {/* Welcome text */}
          <Typography variant="h4">Welcome</Typography>
          <Typography variant="body2">Sign in to your account</Typography>

          {/* Error */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Form component */}
          <Box component="form" onSubmit={formik.handleSubmit}>
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
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? <CircularProgress /> : "Sign In"}
            </Button>
          </Box>

          {/* Show dummy username & password */}
          <Box>
            <Typography variant="caption">
              Demo: <strong>emilys</strong> / <strong>emilyspass</strong>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
