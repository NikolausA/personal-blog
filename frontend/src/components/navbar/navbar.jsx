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
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit">Placeholder 1</Button>
          <Button color="inherit">Placeholder 2</Button>
          <Button color="inherit">Placeholder 3</Button>
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
