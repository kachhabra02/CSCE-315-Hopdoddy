import React, { useEffect } from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  Button 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import axios from 'axios';

const initialRows = [];

function EditToolbar(props) {
  const { rows, setRows, setRowModesModel } = props;

  const handleClick = () => {
    let id = -1;
    rows.forEach(row => {
      id = Math.max(id, row.id) + 1;
    });
    setRows((oldRows) => [...oldRows, { id, inventory_name: '', price: 0, quantity: 0, unit: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

function Inventory() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [saveQueue, setSaveQueue] = React.useState([]);

  useEffect(() => {
    apiGetMenu(data => setRows(data));
  }, []);

  const getRow = (id) => {
    const hits = rows.filter(row => row.id === id);
    if (hits.length <= 0) {
      return {}
    }
    return hits[0];
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    const { isNew } = getRow(id);
    if (isNew) {
      saveQueue.push(apiAddInvItem(id));
      setSaveQueue(saveQueue);
    }
    else {
      saveQueue.push(apiUpdateInvItem(id));
      setSaveQueue(saveQueue);
    }
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => {
      const isOther = row.id !== id;
      if (!isOther) {
        console.log("Deleting", id, row)
        apiDeleteInvItem(id)
      }
      return isOther;
    }));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((currRow) => {
      const isTarget = currRow.id === updatedRow.id

      if (isTarget) {
        for (let i = 0; i < saveQueue.length; i++) {
          const apiCallObj = saveQueue[i];
          if (apiCallObj.id === updatedRow.id) {
            saveQueue.splice(i, 1);
            apiCallObj.go(newRow, () => {
              console.log("Done saving");
            });
          }
        }
        return updatedRow;
      }
      return currRow;
    }));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

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
      type: 'number',
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
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
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
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { rows, setRows, setRowModesModel },
          }}
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

const apiGetMenu = (callback) => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/inventory`)
    .then(res => {
      if (res.status < 300) {
        callback(addIDKeys(res.data));
      }
    })
    .catch( error => console.log(error) );
}

const apiAddInvItem = (id) => {
  return {
    id,
    go: (row, callback) => {
      console.log({
        ...row,
        name: row.inventory_name,
      });
      axios.post(`${process.env.REACT_APP_API_URL}/api/inventory`, {
        ...row,
        name: row.inventory_name,
      })
        .then(res => {
          callback(res.status);
        })
        .catch( error => console.log(error) );
    },
  }
}

const apiUpdateInvItem = (id) => {
  console.log("Preparing inventory update...")
  return {
    id,
    go: (row, callback) => {
      console.log("Writting", row)
      axios.put(`${process.env.REACT_APP_API_URL}/api/inventory/${id}`, {
        name: row.inventory_name,
        ...row,
      })
        .then(res => {
          callback(res.status);
        })
        .catch( error => console.log(error) );
    }
  }
}

const apiDeleteInvItem = (id, callback) => {
  axios.delete(`${process.env.REACT_APP_API_URL}/api/inventory/${id}`)
    .then(res => {
      callback(res.status);
    })
    .catch( error => console.log(error) );
}

export default Inventory