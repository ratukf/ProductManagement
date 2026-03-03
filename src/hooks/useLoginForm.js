import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { login } from "../action/authAction";
import { useMemo, useState } from "react";
import { useAuthStore } from "../store/authStore";

const useLoginForm = () => {
  const nav = useNavigate();
  const { isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  //   Formik validation
  const validationSchema = useMemo(
    () =>
      yup.object({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
      }),
    [],
  );

  //   Form state and submit action
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await login(values.username, values.password);
      if (result.success) nav("/dashboard");
    },
  });

  //   Show/hide password toggle button state
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return {
    formik,
    isLoading,
    error,
    showPassword,
    toggleShowPassword,
  };
};

export { useLoginForm };
