import { TextField, Button, Box, Typography, Grid2 } from "@mui/material";

export const Registration = () => {
  return (
    <Box
      component="form"
      // onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 3, maxWidth: 400, mx: "auto" }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Регистрация нового пользователя
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Имя пользователя"
            name="username"
            // value={formData.username}
            // onChange={handleChange}
            // error={!!errors.username}
            // helperText={errors.username}
          />
        </Grid2>
        <Grid2 item xs={12}>
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
        </Grid2>
        <Grid2 item xs={12}>
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
        </Grid2>
        <Grid2 item xs={12}>
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
        </Grid2>
      </Grid2>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Отправить
      </Button>
    </Box>
  );
};
