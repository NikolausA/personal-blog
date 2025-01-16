import * as yup from "yup";
import { PASSWORD_REGEX } from "../constants";

export const registrationFormSchema = yup.object().shape({
  username: yup.string().required("Обязательно для заполнения"),
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
  confirmation: yup
    .string()
    .required("Обязательно для заполнения")
    .oneOf(
      [yup.ref("password")],
      "Введенное значение не соответствует полю пароль"
    ),
});
