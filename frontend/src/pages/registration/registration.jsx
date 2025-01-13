import { TextField, Button, Box, Typography } from "@mui/material";

export const Registration = () => {
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
        Регистрация
      </Typography>
      <TextField
        fullWidth
        label="Имя пользователя"
        name="username"
        // value={formData.username}
        // onChange={handleChange}
        // error={!!errors.username}
        // helperText={errors.username}
      />
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
      <TextField
        fullWidth
        label="Подтверждение пароля"
        name="confirmPassword"
        type="password"
        // value={formData.confirmPassword}
        // onChange={handleChange}
        // error={!!errors.confirmPassword}
        // helperText={errors.confirmPassword}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3, py: 1, px: 2 }}
      >
        Отправить
      </Button>
    </Box>
  );
};
