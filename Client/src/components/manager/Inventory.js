import { Paper, Box, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { BsFillTrash3Fill } from 'react-icons/bs';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Inventory() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    apiGetMenu(data => setRows(data));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
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
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      sortable: false,
      renderCell: (params) => {
        const handleDelete = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(params);
          apiDeleteInvItem(params.row, () => {
            setRows(rows.filter((row) => row.id !== params.id));
          });
        };
  
        return (
          <GridActionsCellItem 
            icon={<BsFillTrash3Fill />}
            label='delete'
            color='error'
            onClick={handleDelete}
          />
        );
      },
    },
  ];

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
            apiUpdateInvItem(newRow)
            return updatedRow;
          }}
          rows={rows}
          columns={columns}
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

function apiGetMenu (callback) {
  axios.get(`${process.env.REACT_APP_API_URL}/api/inventory`)
    .then(res => {
      if (res.status < 300) {
        callback(addIDKeys(res.data));
      }
    })
    .catch( error => console.log(error) );
}

function apiUpdateInvItem ({ id, ...row }, callback) {
  axios.put(`${process.env.REACT_APP_API_URL}/api/inventory/${id}`, {
    name: row.inventory_name,
    ...row,
  })
    .then(res => {
      callback(res.status);
    })
    .catch( error => console.log(error) );
}

function apiDeleteInvItem ({ id }, callback) {
  axios.delete(`${process.env.REACT_APP_API_URL}/api/inventory/${id}`)
    .then(res => {
      callback(res.status);
    })
    .catch( error => console.log(error) );
}

export default Inventory