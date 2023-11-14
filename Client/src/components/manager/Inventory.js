
// import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridRowModes } from '@mui/x-data-grid';
// import { BsFillTrash3Fill } from 'react-icons/bs';
// import AddIcon from '@mui/icons-material/Add';

import * as React from 'react';
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

// function EditToolbar(props) {
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     const id = 5000;
//     setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

// function Inventory() {
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     apiGetMenu(data => setRows(data));
//   }, []);

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     {
//       field: 'inventory_name',
//       headerName: 'Name',
//       width: 230,
//       editable: true,
//     },
//     {
//       field: 'price',
//       headerName: 'Price',
//       width: 150,
//       editable: true,
//     },
//     {
//       field: 'quantity',
//       headerName: 'Quantity',
//       type: 'number',
//       width: 110,
//       editable: true,
//     },
//     {
//       field: 'unit',
//       headerName: 'Unit',
//       description: 'This column has a value getter and is not sortable.',
//       sortable: false,
//       editable: true,
//       width: 100,
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 130,
//       sortable: false,
//       renderCell: (params) => {
//         const handleDelete = (e) => {
//           e.stopPropagation(); // don't select this row after clicking
//           console.log(params);
//           apiDeleteInvItem(params.row, () => {
//             setRows(rows.filter((row) => row.id !== params.id));
//           });
//         };
  
//         return (
//           <GridActionsCellItem 
//             icon={<BsFillTrash3Fill />}
//             label='delete'
//             color='error'
//             onClick={handleDelete}
//           />
//         );
//       },
//     },
//   ];

//   return (
//     <Box sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}>
//       <Typography padding={3} variant='h3'>
//         Inventory Management
//       </Typography>
//       <Paper sx={{ height: '70vh', width: '90%' }}>
//         <DataGrid
//           processRowUpdate = {(newRow) => {
//             const updatedRow = { ...newRow, isNew: false };
//             setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//             // setSnackbar({ children: tableName + ' successfully saved', severity: 'success' });
//             apiUpdateInvItem(newRow)
//             return updatedRow;
//           }}
//           rows={rows}
//           columns={columns}
//           disableRowSelectionOnClick
//         />
//       </Paper>
//     </Box>
//   );
// }



const roles = ['Market', 'Finance', 'Development'];

const initialRows = [];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 5000;
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
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
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
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
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    // { field: 'name', headerName: 'Name', width: 180, editable: true },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 80,
    //   align: 'left',
    //   headerAlign: 'left',
    //   editable: true,
    // },
    // {
    //   field: 'joinDate',
    //   headerName: 'Join date',
    //   type: 'date',
    //   width: 180,
    //   editable: true,
    // },
    // {
    //   field: 'role',
    //   headerName: 'Department',
    //   width: 220,
    //   editable: true,
    //   type: 'singleSelect',
    //   valueOptions: ['Market', 'Finance', 'Development'],
    // },
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
            toolbar: { setRows, setRowModesModel },
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

function apiGetMenu (callback) {
  axios.get(`${process.env.REACT_APP_API_URL}/api/inventory`)
    .then(res => {
      if (res.status < 300) {
        callback(addIDKeys(res.data));
      }
    })
    .catch( error => console.log(error) );
}

function apiAddInvItem (row, callback) {
  axios.post(`${process.env.REACT_APP_API_URL}/api/inventory`, {
    name: row.inventory_name,
    ...row,
  })
    .then(res => {
      callback(res.status);
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