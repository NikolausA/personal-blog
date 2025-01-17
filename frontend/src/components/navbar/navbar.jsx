import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_TYPE } from "../../actions";
import { selectUserName } from "../../selectors";
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
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const handleLogout = () => {
    localStorage.setItem("token", "");
    dispatch(ACTION_TYPE.LOGOUT);
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Персональный блог
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link to="/addNewPost">
            <Button sx={{ color: "white" }}>Добавить пост</Button>
          </Link>
          <Button color="inherit">Placeholder 2</Button>
          <Box>{`Имя пользователя: ${userName}`}</Box>
          <Link to="/">
            <Button sx={{ color: "white" }} onClick={handleLogout}>
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
