import React from "react";
import UserLogOut from "./UserLogOut";
import { Box, Typography, useTheme } from "@mui/material";

const DashView = ({ data }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: "250px",
        right: 0,
        backgroundColor: theme.palette.primary.main,
        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        padding: "8px",
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: theme.palette.common.white,
            fontWeight: "bold",
            padding: "16px",
          }}
        >
          {data}
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", padding: "12px" }}
      >
        <UserLogOut />
      </Box>
    </Box>
  );
};

export default DashView;
