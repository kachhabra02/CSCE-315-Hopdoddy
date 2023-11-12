import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, Box, Typography, Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import React, { useEffect, useState } from 'react';
import axios from "axios";

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const thisRow = {
          id: params.id,
          inventory_name: params.inventory_name,
          price: params.price,
          quantity: params.quantity,
          unit: params.unit,
        };

        // Handle the action
        alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}>Click</Button>;
    },
  },
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
    if (obj.hasOwnProperty('inventory_id')) {
      return {
        ...obj,
        id: obj.inventory_id,
        inventory_id: undefined
      };
    }
    return obj;
  }).map(({ inventory_id, ...rest }) => rest);
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