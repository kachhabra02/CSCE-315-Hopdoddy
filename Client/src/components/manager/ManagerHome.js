import { Typography } from '@mui/material';
import React from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { useAuth } from '../../credentials/AuthProvider';

const makeButton = (path, label) => 
  <Button sx={{ minWidth: '20em' }} variant='contained' component={Link} to={`/manager/${path}`}>{label}</Button>;

function ManagerHome() {
  const { userObj } = useAuth();

  return (
    <Box sx={{
      display: 'flex',        // Enable flex container
      flexDirection: 'column',  // Stack children vertically
      justifyContent: 'center', // Center children along the vertical axis
      alignItems: 'center',    // Center children along the horizontal axis
      height: '80vh',         // Set the height of the container (e.g., full viewport height)
    }}>
      <Typography variant="h3" padding={3}>
        {`Welcome, ${userObj.name}`}
      </Typography>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          {makeButton('inventory', 'View/Manage Inventory')}
          {makeButton('menu', 'View/Manage Menu Items')}
        </Stack>
        <Stack direction="row" spacing={2}>
          {makeButton('restock', 'Restock Report')}
          {makeButton('excess', 'Excess Report')}
        </Stack>
        <Stack direction="row" spacing={2}>
          {makeButton('history', 'View/Manage Order History')}
          {makeButton('sales', 'Sales Report')}
        </Stack>
        <Stack direction="row" spacing={2}>
          {makeButton('usage', 'Product Usage')}
          {makeButton('what-sells-together', 'What Sells Together')}
        </Stack>
        <Button 
          sx={{ minWidth: '20em' }} 
          variant='contained' 
          component={Link} 
          to={`/admin`}
          color='secondary'
          children={"Admin - User Management"}
        />
      </Stack>
    </Box>
  )
}

export default ManagerHome