import { Typography } from '@mui/material';
import React from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'

const makeButton = (path, label) => 
    <Button variant='contained' component={Link} to={path}>{label}</Button>;

function ManagerHome() {
  return (
    <Box sx={{
        display: 'flex',          // Enable flex container
        flexDirection: 'column',  // Stack children vertically
        justifyContent: 'center', // Center children along the vertical axis
        alignItems: 'center',     // Center children along the horizontal axis
        height: '80vh',           // Set the height of the container (e.g., full viewport height)
    }}>
        <Typography variant="h3" padding={3}>
            Welcome, Manager
        </Typography>
        <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
                {makeButton('/manager/inventory','View/Manage Inventory')}
                {makeButton('/manager/menu','View/Manage Menu Items')}
            </Stack>
            <Stack direction="row" spacing={2}>
                {makeButton('/manager/history','View Order History')}
                {makeButton('/manager/reports','Generate Reports')}
            </Stack>
            <Stack direction="row" spacing={2}>
                {makeButton('/manager/trends','Analyze Trends')}
            </Stack>
        </Stack>
    </Box>
  )
}

export default ManagerHome