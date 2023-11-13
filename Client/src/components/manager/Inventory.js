import { Paper, Box, Typography, Button, ButtonGroup } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BsFillTrash3Fill, BsSave2Fill } from 'react-icons/bs';

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
      const handleDelete = (ae) => {
        ae.stopPropagation(); // don't select this row after clicking
        console.log(params);
        alert(JSON.stringify(params.row, null, 4));
      };

      const handleSave = (ae) => {
        ae.stopPropagation(); // don't select this row after clicking
        console.log(params);
        alert(JSON.stringify(params.row, null, 4));
      };

      return (
        <ButtonGroup 
          aria-label='outline button group'
        >
          <Button 
            color='error'
            onClick={handleDelete}
          > <BsFillTrash3Fill /> 
          </Button>
          <Button 
            color='warning'
            onClick={handleSave}
          > <BsSave2Fill />
          </Button>
        </ButtonGroup>
      );
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