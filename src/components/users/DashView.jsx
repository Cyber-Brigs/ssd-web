import React from "react";
import UserLogOut from "./UserLogOut";
import { Box, Typography, useTheme } from "@mui/material";

const DashView = ({ data }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        height: '80px',
        borderRadius: '8px',
        marginTop: '2',
        marginX: 2,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ color: theme.palette.common.white, fontWeight: 'bold', padding: '16px' }}
        >
          {data}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '12px' }}>
        <UserLogOut />
      </Box>
    </Box>
  );
};

export default DashView;
