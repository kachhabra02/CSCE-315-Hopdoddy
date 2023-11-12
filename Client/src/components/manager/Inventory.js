import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import React, { useEffect, useState } from 'react';
import axios from "axios";

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'inventory_name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    editable: true,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'unit',
    headerName: 'Unit',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
  },
];

function Inventory() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getMenu(data => setRows(data));
  }, []);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Typography padding={3} variant='h3'>
        Inventory Management
      </Typography>
      <Paper sx={{ height: '70vh', width: '90%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}

function replaceIDKeys (objects) {
  return objects.map(obj => {
    // Check if the object has the key 'inventory_id'
    if (obj.hasOwnProperty('inventory_id')) {
      return {
        ...obj, // Spread the original object
        id: obj.inventory_id, // Add the new 'id' key with the value of 'inventory_id'
        inventory_id: undefined // Set 'inventory_id' to undefined to remove it
      };
    }
    return obj; // Return the object unchanged if 'inventory_id' is not a key
  }).map(({ inventory_id, ...rest }) => rest); // Second map to remove 'inventory_id' key
}

function getMenu (callback) {
  axios.get(`${process.env.REACT_APP_API_URL}/api/inventory`)
    .then((res) => {
      if (res.status < 300) {
        callback(replaceIDKeys(res.data));
      }
    })
    .catch( error => console.log(error) );
}

export default Inventory