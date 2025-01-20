import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../actions";
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
import LogoutIcon from "@mui/icons-material/Logout";

export const Navbar = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("token", "");
    dispatch(LOGOUT);
    navigate("/");
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">
          <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
            Персональный блог
          </Typography>
        </Link>
        <Box sx={{ display: "flex" }}>
          {userName ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Link to="/addNewPost">
                <Button sx={{ color: "white" }}>Добавить пост</Button>
              </Link>
              <Box
                sx={{ padding: "6px 8px" }}
              >{`Пользователь: ${userName}`}</Box>
              <Link to="/">
                <IconButton
                  sx={{ color: "white" }}
                  edge="end"
                  component={Link}
                  onClick={handleLogout}
                  aria-label="logout"
                >
                  <LogoutIcon />
                </IconButton>
              </Link>
            </Box>
          ) : (
            <IconButton
              color="inherit"
              edge="end"
              component={Link}
              to="/login"
              aria-label="login"
            >
              <LoginIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
