import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <AppBar position="static" color="default" sx={{boxShadow: "0", height: "100px", p: 2}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <img
          src="https://www.nrf.go.ke/wp-content/uploads/2023/06/NRF-LOGO-LOCKUP-Site-Icon.png"
          alt="Logo"
          style={{ width: 200 }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          {currentPath !== "/log-in" && (
            <Button
              onClick={() => navigate("/log-in")}
              variant="outlined"
              color="primary"
            >
              Log In
            </Button>
          )}
          {currentPath !== "/sign-up" && (
            <Button
              onClick={() => navigate("/sign-up")}
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
