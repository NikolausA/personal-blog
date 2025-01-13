import { TextField, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Authorization = () => {
  return (
    <Box
      component="form"
      // onSubmit={handleSubmit}
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
        // value={formData.email}
        // onChange={handleChange}
        // error={!!errors.email}
        // helperText={errors.email}
      />
      <TextField
        fullWidth
        label="Пароль"
        name="password"
        type="password"
        // value={formData.password}
        // onChange={handleChange}
        // error={!!errors.password}
        // helperText={errors.password}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3, py: 1, px: 2 }}
      >
        Отправить
      </Button>
      <Link to={"/register"}>Зарегистрироваться</Link>
    </Box>
  );
};
