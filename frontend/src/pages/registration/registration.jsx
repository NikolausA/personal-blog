import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { request } from "../../utils/request";
import { registrationFormSchema } from "../../form-schemas";
import { API_URL } from "../../constants";
import { TextField, Button, Box, Typography } from "@mui/material";

export const Registration = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { touchedFields, isValid, errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmation: "",
    },
    resolver: yupResolver(registrationFormSchema),
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const handleFormSubmit = ({ username, email, password }) => {
    request(`${API_URL}/auth/register`, "POST", { username, email, password })
      .then((response) => {
        const { name, token, redirect, redirectUrl, error } = response;

        if (token) {
          localStorage.setItem("token", token);
        }
        if (name) {
          console.log(name);
          // dispatch({
          //   type: "LOGIN",
          //   payload: { name },
          // });
        }
        if (error) {
          setServerErrorMessage(error);
        }
        if (redirect) {
          navigate(redirectUrl);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          console.error("Validation errors:", error.response.data.errors);
        } else {
          console.error("Unexpected error:", error);
        }
      });
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      sx={{
        mt: 3,
        width: 300,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Регистрация
      </Typography>
      <TextField
        fullWidth
        label="Имя пользователя"
        name="username"
        {...register("username")}
      />
      {errors.username && (
        <Typography variant="caption" color="error">
          {errors.username?.message}
        </Typography>
      )}
      <TextField
        fullWidth
        label="Электронная почта"
        name="email"
        type="email"
        {...register("email")}
      />
      {errors.email && (
        <Typography variant="caption" color="error">
          {errors.email?.message}
        </Typography>
      )}
      <TextField
        fullWidth
        label="Пароль"
        name="password"
        type="password"
        {...register("password", {
          onChange: () => touchedFields.confirmation && trigger("confirmation"),
        })}
      />
      {errors.password && (
        <Typography variant="caption" color="error">
          {errors.password?.message}
        </Typography>
      )}
      <TextField
        fullWidth
        label="Подтверждение пароля"
        name="confirmPassword"
        type="password"
        {...register("confirmation")}
      />
      {errors.confirmation && (
        <Typography variant="caption" color="error">
          {errors.confirmation?.message}
        </Typography>
      )}
      {serverErrorMessage && (
        <Typography variant="caption" color="error">
          {serverErrorMessage}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3, py: 1, px: 2 }}
        disabled={!isValid}
      >
        Отправить
      </Button>
    </Box>
  );
};
