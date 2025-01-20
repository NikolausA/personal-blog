import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { request } from "../../utils/request";
import { authFormSchema } from "../../form-schemas";
import { setUser } from "../../actions";
import { API_URL } from "../../constants";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Authorization = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const handleFormSubmit = ({ email, password }) => {
    request(`${API_URL}/auth/login`, "POST", { email, password })
      .then((response) => {
        const { id, username, token, redirect, redirectUrl, error } = response;

        if (token) {
          localStorage.setItem("token", token);
        }
        if (username) {
          dispatch(setUser({ id, username }));
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
        Авторизация
      </Typography>
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
        {...register("password")}
      />
      {errors.password && (
        <Typography variant="caption" color="error">
          {errors.password?.message}
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
      <Link to={"/register"}>Зарегистрироваться</Link>
    </Box>
  );
};
