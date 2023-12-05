import React from 'react'
import { useState } from 'react';

import { Box, Button, Card, CardActions, CardContent, Modal, Stack, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MUIDataTable from 'mui-datatables';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StartIcon from '@mui/icons-material/Start';

import axios from 'axios';

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


function Admin() {
  const [rows, setRows] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    getUsers()
      .then(rows => {
        setRows(rows);
      });
  }, []);

  const handleEditUser = (user) => {
    setCurrUser(user);
    setIsEditing(true);
  }

  const handleEditClose = () => {
    setCurrUser(null);
    setIsEditing(false);
  }

  const handleEditSave = () => {
    updateUser(currUser)
      .then(() => {
        setCurrUser(null);
        setIsEditing(false);
        return getUsers();
      })
      .then(rows => {
        setRows(rows);
      });
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrUser(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
    }));
  }

  const title = 'User Administration';

  const columns = [
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
        filter: true,
        sort: true
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
        sort: true,
        customBodyRender: data => {
          return (
            <Button
              onClick={() => handleEditUser(data)}
              variant='outlined'
              color='warning'
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
                  Edit User
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
                </Stack>
              </CardContent>
              <CardActions>
                <Box sx={{ textAlign: 'left', flexGrow: 1 }}>    
                  <Button 
                    variant='contained' 
                    color='success' 
                    onClick={handleEditSave}
                    children={<EditIcon />}
                  />
                </Box>
                <Button 
                  variant='contained' 
                  color='error' 
                  onClick={handleEditClose}
                  children={<ExitToAppIcon />}
                />
              </CardActions>
            </Card>
          </Box>
        </Modal>
      )}
    </Box>
  );
}

async function getUsers() {
  try {
    const res = await API.get(`/users`);
    if (res.status < 300) {
      return (res.data.map((item) => [
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

async function updateUser(user) {
  console.log(user);
  try {
    const res = await API.put(`/users/${user.employee_id}`, user);
    console.log(res);
  }
  catch (error) {
    console.log(error);
  }
}

export default Admin
