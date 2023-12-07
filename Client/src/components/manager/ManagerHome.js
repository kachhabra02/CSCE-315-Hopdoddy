/**
 * This module provides the Manager Home page component for the application. 
 * It includes a series of navigation buttons for different management functionalities 
 * such as inventory management, menu item management, viewing reports, and more.
 * @module ManagerHome
 */

import { Typography } from '@mui/material';
import React from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { useAuth } from '../../credentials/AuthProvider';

/**
 * Generates a Button component with specified path and label.
 * 
 * @param {string} path - The URL path for the button's link.
 * @param {string} label - The label text of the button.
 * @returns {React.Component} A Button component configured with routing and styling.
 */
const makeButton = (path, label) => 
  <Button sx={{ minWidth: '20em' }} variant='contained' component={Link} to={`/manager/${path}`}>{label}</Button>;

/**
 * ManagerHome is a React component that serves as the home page for managers.
 * It provides navigation buttons to various management features like inventory, menu items, reports, and more.
 * 
 * @returns {React.Component} The Manager's Home component with navigation options.
 */
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