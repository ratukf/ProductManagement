import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const FormField = ({
  formik,
  name,
  label,
  type = "text",
  showPassword,
  onTogglePassword,
  ...props
}) => {
  const isPassword = type === "password";
  const isError = formik.touched[name] && !!formik.errors[name];
  const helperText = formik.touched[name] && formik.errors[name];

  return (
    <TextField
      name={name}
      label={label}
      type={isPassword && showPassword ? "text" : type}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={isError}
      helperText={helperText}
      fullWidth
      InputProps={
        isPassword
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
      {...props}
    />
  );
};

export { FormField };
