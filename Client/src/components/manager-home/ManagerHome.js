import { Typography } from '@mui/material';
import React from 'react'
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { ThemeProvider, useTheme } from '@emotion/react';

const makeButton = (path, label) => 
    <Button component={Link} to={path}>{label}</Button>;

function ManagerHome() {
  return (
    <Box
        sx={{
            display: 'flex',       // Enable flex container
            flexDirection: 'column', // Stack children vertically
            justifyContent: 'center', // Center children along the vertical axis
            alignItems: 'center',    // Center children along the horizontal axis
            height: '80vh',         // Set the height of the container (e.g., full viewport height)
        }}>
    <Typography variant="h3">
        Welcome, Manager
    </Typography>
    <Stack spacing={2}>
        <div style={{alignItems: 'center'}}>{makeButton('/','View/Manage Inventory')}{makeButton('/','View/Manage Menu Items')}</div>
        <div>{makeButton('/','View Order History')}{makeButton('/','Generate Reports')}</div>
        <div>{makeButton('/','Analyze Trends')}</div>
    </Stack>
    </Box>
  )
}

export default ManagerHome