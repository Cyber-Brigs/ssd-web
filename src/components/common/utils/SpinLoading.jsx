import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const SpinLoading = ({text}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress
        style={{ marginBottom: 2 }}
        color="primary"
        size={60}
      />
      <Typography variant="h6" color="primary">
        {text}
      </Typography>
    </div>
  );
};

export default SpinLoading;
