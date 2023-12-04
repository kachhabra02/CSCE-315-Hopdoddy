import React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MUIDataTable from "mui-datatables";

import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 30000 // 30 second timeout
});


function MenuManagment() {
  const [menu, setMenu] = useState(undefined);
  const [alerts, setAlerts] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editMenuItem, setEditMenuItem] = useState(null);


  function loadMenu() {
    API.get(`/menu/view`)
     .then((res) => {
       if (res.status < 300) {
         console.log('Success');
         console.log(res.data);
         setMenu(res.data.map((item) => [item.item_id, item.item_name, item.category, item.sub_category,
                                         item.price, item.is_modification.toString(), item.display_item.toString(),
                                         item.display_image.toString(), item.display_description.toString(), item.item_description]));
       }
       else {
         console.log(res.data);
         setMenu(['Error Retrieving Report! Please try again... (may need to use a smaller time window)']);
       }
     })
     .catch((error) => {
       console.log(error);
       setMenu(['Error Retrieving Report! Please try again... (may need to use a smaller time window)']);
     });
  }

  function removeAlert(index) {
    alerts.splice(index, 1);
    setAlerts([...alerts]);
  }

  async function deleteItem(item_info, new_alerts) {
    await API.delete(`/menu/item/${item_info[0]}`)
     .then((res) => {
       if (res.status < 300) {
         console.log(`Deleted item ${item_info[1]}`);
         new_alerts.unshift(
           {
             severity: 'success',
             text: `Successfully Deleted Item '${item_info[1]}'`
           }
         );
       }
       else {
         console.log(`Failed to delete item ${item_info[1]}`);
         new_alerts.unshift(
           {
             severity: 'error',
             text: `Failed to Delete Item '${item_info[1]}'`
           }
         );
       }
     })
     .catch((error) => {
       console.log(error);
       new_alerts.unshift(
         {
           severity: 'error',
           text: `Failed to Delete Item '${item_info[1]}'`
         }
       );
     });
  }


   const handleEditClick = (menuItem) => {
    setEditMenuItem(menuItem);
    setOpenEditDialog(true);
  };

  const handleEditCloseDialog = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) {
        return;
    }
    
    setOpenEditDialog(false);
    setEditMenuItem(null);
  };

  const handleEditSubmit = () => {
    console.log("Submitted");
    handleEditCloseDialog();
  }

  const handleEditCancel = () => {
    console.log("Canceled");
    handleEditCloseDialog();
  }


  const title = 'Menu Management';

  const columns = [
    {
      name: 'Item ID',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Category',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Subcategory',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Price',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Is Modification?',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'Display Item on Menu Board?',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'Display Image on Menu Board?',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'Display Description on Menu Board?',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'Item Description',
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: 'Edit Item',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <Button onClick={() => handleEditClick(menu[tableMeta.rowIndex])}>
                <EditIcon/>
              </Button>
            )
        }
      }
    }
  ];

  const options = {
    filterType: 'multiselect',
    selectableRows: 'multiple',
    downloadOptions: { filename: 'menu.csv', serparator: ',' },
    draggableColumns: { enabled: true },
    resizableColumns: true,
    onRowsDelete: async (rowsDeleted) => {
        const new_alerts = [...alerts];

        const item_info = rowsDeleted.data.map((item) => menu[item.dataIndex]);
        await Promise.all(item_info.map(async (item) => deleteItem(item, new_alerts)));

        console.log([...new_alerts]);
        setAlerts(new_alerts);
        loadMenu();
    }
  };
    
  
  if (menu === undefined) {
    loadMenu();
  }
  
  return (
    <Box>
      <br/>
      <Stack spacing={1}>
        {
          alerts.map((item, index) => 
              <Alert severity={item.severity} onClose={() => removeAlert(index)} key={`alert-${index}`}>
                {item.text}
              </Alert>
          )
        }
      </Stack>
      
      <br/>

      {menu === undefined ? <CircularProgress /> :
        <MUIDataTable
          title={title}
          data={menu}
          columns={columns}
          options={options}
        />
      }

      {editMenuItem && (
        <Dialog open={openEditDialog} onClose={handleEditCloseDialog}>
          <DialogTitle>{`Edit Menu Item "${editMenuItem[1]}"`}</DialogTitle>
          <DialogContent>
            <p>Form Content Here</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditCancel}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Ok</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default MenuManagment