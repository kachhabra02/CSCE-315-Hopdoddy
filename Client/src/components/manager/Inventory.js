import { Paper, Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BsFillTrash3Fill } from 'react-icons/bs';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 130,
    sortable: false,
    renderCell: (params) => {
      const handleDelete = (e) => {
        e.stopPropagation(); // don't select this row after clicking
        console.log(params);
        alert(JSON.stringify(params.row, null, 4));
      };

      return (
        <Button 
          color='error'
          onClick={handleDelete}
        > <BsFillTrash3Fill /> 
        </Button>
      );
    },
  },
  {
    field: 'inventory_name',
    headerName: 'Name',
    width: 230,
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
    editable: true,
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
          processRowUpdate = {(newRow) => {
            const updatedRow = { ...newRow, isNew: false };
            setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
            // setSnackbar({ children: tableName + ' successfully saved', severity: 'success' });
            updateInvItem(newRow)
            return updatedRow;
          }}
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}

function addIDKeys (objects) {
  return objects.map(obj => {
    if (obj.hasOwnProperty('inventory_id')) {
      return {
        ...obj,
        id: obj.inventory_id,
      };
    }
    return obj;
  });
}

function getMenu (callback) {
  axios.get(`${process.env.REACT_APP_API_URL}/api/inventory`)
    .then(res => {
      if (res.status < 300) {
        callback(addIDKeys(res.data));
      }
    })
    .catch( error => console.log(error) );
}

function updateInvItem ({ id, ...row }, callback) {
  axios.put(`${process.env.REACT_APP_API_URL}/api/inventory/${id}`, {
    name: row.inventory_name,
    ...row,
  })
    .then(res => {
      callback(res.status);
    })
    .catch( error => console.log(error) );
}

export default Inventory