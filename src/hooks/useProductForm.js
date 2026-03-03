import { useMemo } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useProductStore } from "../store/productStore";
import { updateProduct, createProduct } from "../action/productAction";

const useProductForm = ({ initialValues = null, onSuccess }) => {
  const { isSubmitting, error } = useProductStore();

  const validationSchema = useMemo(
    () =>
      yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        price: yup
          .number()
          .required("Price is required")
          .positive("Price must be positive"),
        stock: yup
          .number()
          .required("Stock is required")
          .min(0, "Stock cannot be negative"),
        brand: yup.string().required("Brand is required"),
        category: yup.string().required("Category is required"),
      }),
    [],
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      price: initialValues?.price || "",
      stock: initialValues?.stock || "",
      brand: initialValues?.brand || "",
      category: initialValues?.category || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      let result;
      if (initialValues?.id) {
        result = await updateProduct({ id: initialValues.id, payload: values });
      } else {
        result = await createProduct({ payload: values });
      }
      if (result.success && onSuccess) onSuccess(result.data);
    },
  });

  return { formik, isSubmitting, error };
};

export { useProductForm };
