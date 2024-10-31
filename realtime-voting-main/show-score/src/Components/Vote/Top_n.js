import React from 'react';
import { Typography, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function AdjustableValue({ value, onIncrement, onDecrement }) {
  return (
    <div style={{ flexDirection: 'column' , maxWidth : "20%"}}>
      <IconButton variant="contained" onClick={onIncrement}>
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton variant="contained" onClick={onDecrement}>
        <ArrowDownwardIcon />
      </IconButton>
    </div>
  );
}

export default AdjustableValue;
