/**
 * Admin Component
 * 
 * This module defines the Admin component, which handles user administration, including user creation,
 * editing, and deletion. It displays user data in a table and provides a modal for editing or creating users.
 * Uses Material-UI components for the user interface.
 * 
 * @module Admin
 */

import React from 'react'
import { useState } from 'react';

import { Alert, Box, Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, FormGroup, Modal, Snackbar, Stack, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MUIDataTable from 'mui-datatables';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import ConfirmationOnClickElement from './ConfirmationOnClickElement';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 10000 // 10 second timeout
});

const options = {
  filterType: 'multiselect',
  selectableRows: 'none',
  downloadOptions: { filename: 'restockReport.csv', serparator: ',' },
  draggableColumns: { enabled: true },
  resizableColumns: true
};

const createRow = [
  '', 
  '', 
  '', 
  '', 
  '', 
  {
    is_new: true,
    is_manager: false, 
    is_admin: false, 
    email: '',
    first_name: '',
    last_name: '',
  }
]

const updateMode = 42;
const createMode = 24;

/**
 * Admin Component
 * 
 * This component handles user administration, allowing the creation, editing, and deletion of user accounts.
 * It displays user data in a table and provides a modal for editing or creating users.
 * Uses Material-UI components for UI elements.
 * 
 * @component
 */
function Admin() {
  const [rows, setRows] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);
  const [alertStatus, setAlertStatus] = useState({ open: false, durration: 5000 });
  const [editMode, setEditMode] = useState();

  React.useEffect(() => {
    getUsers()
      .then(rows => {
        rows.push(createRow);
        setRows(rows);
      });
  }, []);

  const openAlertFromResponse = (error) => {
    const message = error.message + ". " + error.response.data;
    setAlertStatus({
      open: true,
      serverity: 'error',
      message: message,
      durration: 200 * message.length
    });
  }

  const closeAlert = (event, reason) => {
    setAlertStatus({ ...alertStatus, open: false, durration: 5000 });
  }

  const handleEditUser = (user) => {
    setEditMode(updateMode);
    setCurrUser(user);
    setIsEditing(true);
  }

  const handleCreateUser = (user) => {
    setEditMode(createMode);
    setCurrUser(user);
    setIsEditing(true);
  }

  const handleEditClose = () => {
    setCurrUser(null);
    setIsEditing(false);
    setHasEdited(false);
  }

  const handleEditSave = () => {
    updateUser(currUser, openAlertFromResponse)
      .then(() => {
        handleEditClose();
        return getUsers();
      })
      .then(rows => {
        rows.push(createRow);
        setRows(rows);
      });
  }

  const handleCreateSave = () => {
    createUser(currUser, openAlertFromResponse)
      .then(() => {
        handleEditClose();
        return getUsers();
      })
      .then(rows => {
        rows.push(createRow);
        setRows(rows);
      });
  }

  const handleDeleteSave = () => {
    deleteUser(currUser, openAlertFromResponse)
      .then(() => {
        handleEditClose();
        return getUsers();
      })
      .then(rows => {
        rows.push(createRow);
        setRows(rows);
      });
  }

  const handleChange = (e) => {
    setHasEdited(true);
    const { name, value, type, checked } = e.target;
    setCurrUser(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
    }));
  }

  const title = 'User Administration';

  const columns = [
    {
      name: 'ID',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'First',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Last',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Email',
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: 'Permission Level',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRender: data => {
          if (data?.is_new) return (
            <Button
              onClick={() => handleCreateUser(data)}
              variant='outlined'
              color='inherit'
              startIcon={<AddIcon />}
              children={'Create'}
            />
          );
          return (
            <Button
              onClick={() => handleEditUser(data)}
              variant='outlined'
              color='inherit'
              startIcon={<EditIcon />}
              children={'Edit user'}
            />
          );
        }
      }
    }
  ];

  return (
    <Box>
      {!rows ? <CircularProgress /> :
        <MUIDataTable
          title={title}
          data={rows}
          columns={columns}
          options={options}
        />
      }
      {isEditing && (
        <Modal
          open={isEditing}
          aria-labelledby="edit-modal"
          aria-describedby="edit-modal-changes-selected-user"
        >
          <Box sx={{
            display: 'flex',          // Enable flex container
            flexDirection: 'column',  // Stack children vertically
            justifyContent: 'center', // Center children along the vertical axis
            alignItems: 'center',     // Center children along the horizontal axis
            height: '80vh',           // Set the height of the container (e.g., full viewport height)
          }}>
            <Card sx={{ minWidth: 345 }}>
              <CardContent>
                <Typography variant='h6' paddingBottom={3}>
                  { editMode === createMode ? 'Create User' : 'Edit User' }
                </Typography>
                <Stack spacing={4}>
                  <TextField 
                    label="First Name" 
                    name="first_name" 
                    value={currUser.first_name} 
                    onChange={handleChange} 
                    margin="normal"
                    fullWidth
                  />
                  <TextField 
                    label="Last Name" 
                    name="last_name" 
                    value={currUser.last_name} 
                    onChange={handleChange} 
                    margin="normal"
                    fullWidth
                  />
                  <TextField 
                    label="Email" 
                    name="email" 
                    type="email"
                    value={currUser.email} 
                    onChange={handleChange} 
                    margin="normal"
                    fullWidth
                  />
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="is_admin" 
                          checked={currUser.is_admin} 
                          onChange={handleChange} 
                        />
                      }
                      label="Is Admin"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox 
                          name="is_manager" 
                          checked={currUser.is_manager} 
                          onChange={handleChange} 
                        />
                      }
                      label="Is Manager"
                    />
                  </FormGroup>
                </Stack>
              </CardContent>
              <CardActions>
                <Stack direction={'row'} spacing={1} sx={{ textAlign: 'left', flexGrow: 1 }}>    
                  <ConfirmationOnClickElement 
                    Element={Button}
                    variant='contained' 
                    title={ editMode === createMode ? 'Create User?' : 'Save Changes?' }
                    body={ hasEdited ? 'This will push changes to the backend.' : 'But you have made no changes...' }
                    color='success' 
                    onClick={ editMode === createMode ? handleCreateSave : handleEditSave }
                    children={<SaveIcon />}
                  />
                  {editMode === updateMode && <ConfirmationOnClickElement 
                    Element={Button}
                    variant='contained' 
                    title='Delete this user?'
                    body='This cannot be undone.'
                    color='error'
                    confirmColor='error'
                    onClick={ handleDeleteSave }
                    children={<DeleteIcon />}
                  />}
                </Stack>
                <ConfirmationOnClickElement
                  Element={Button} 
                  variant='outlined' 
                  title='Discard changes?'
                  color='inherit' 
                  confirmColor='warning'
                  ask={hasEdited}
                  onClick={handleEditClose}
                  children={<ExitToAppIcon />}
                />
              </CardActions>
            </Card>
          </Box>
        </Modal>
      )}
      <Snackbar 
        open={alertStatus.open} 
        onClose={closeAlert}
        autoHideDuration={alertStatus.durration}
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
      >
        <Alert severity={alertStatus.serverity} sx={{width: "90vw"}} onClose={closeAlert}>{alertStatus.message}</Alert>
      </Snackbar>
    </Box>
  );
}

async function getUsers() {
  try {
    const res = await API.get(`/users`);
    if (res.status < 300) {
      return (res.data.map((item) => [
        item.employee_id,
        item.first_name,
        item.last_name,
        item.email,
        (() => {
          if (item.is_admin)
            return 'Admin';
          else if (item.is_manager) 
            return 'Manager';
          else 
            return 'Cashier';
        })(),
        item
      ]));
    }
    else {
      console.log(res.data);
      return ['Error Retrieving Report! Please try again... (may need to use a smaller time window)'];
    }
  }
  catch (error) {
    console.log(error);
    return ['Error Retrieving Report! Please try again... (may need to use a smaller time window)'];
  }
}

async function updateUser(user, handleError) {
  try {
    return await API.put(`/users/${user.employee_id}`, user);
  }
  catch (error) {
    console.log(error);
    handleError && handleError(error);
  }
}

async function createUser(user, handleError) {
  try {
    return await API.post(`/users`, user);
  }
  catch (error) {
    console.log(error);
    handleError && handleError(error);
  }
}

async function deleteUser(user, handleError) {
  try {
    return await API.delete(`/users/${user.employee_id}`);
  }
  catch (error) {
    console.log(error);
    handleError && handleError(error);
  }
}

export default Admin
