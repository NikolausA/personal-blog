import * as yup from "yup";
import { SUPPORTED_MEDIA_TYPES } from "../constants";

export const addPostFormSchema = yup.object().shape({
  title: yup
    .string()
    .required("Обязательно для заполнения")
    .max(30, "Не может превыщать 30 символов"),

  text: yup
    .string()
    .required("Обязательно для заполнения")
    .max(1000, "Не может превыщать 1000 символов"),

  media: yup
    .mixed()
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || value.size <= 5000000 // 5MB
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) => !value || SUPPORTED_MEDIA_TYPES.includes(value.type)
    ),
});
