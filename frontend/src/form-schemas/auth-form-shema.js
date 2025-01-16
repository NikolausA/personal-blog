import * as yup from "yup";
import { PASSWORD_REGEX } from "../constants";

export const authFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("Обязательно для заполнения")
    .email("Необходимо указать правильный адрес"),
  password: yup
    .string()
    .required("Обязательно для заполнения")
    .matches(
      PASSWORD_REGEX,
      "Поле должно содержать не менее 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ"
    ),
});
