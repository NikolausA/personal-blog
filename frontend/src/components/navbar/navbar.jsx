import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export const Navbar = () => {
  const handleClick = () => {
    localStorage.setItem("token", "");
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link to="/addNewPost">
            <Button color="white">Добавить пост</Button>
          </Link>
          <Button color="inherit">Placeholder 2</Button>
          <Button color="inherit">Placeholder 3</Button>
          <Link to="/">
            <Button color="white" onClick={handleClick}>
              Exit
            </Button>
          </Link>
        </Box>
        <IconButton
          color="inherit"
          edge="end"
          component={Link}
          to="/login"
          aria-label="login"
        >
          <LoginIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
