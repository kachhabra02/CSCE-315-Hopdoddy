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
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MUIDataTable from "mui-datatables";

import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 30000 // 30 second timeout
});


function MenuManagment() {
  const [menu, setMenu] = useState(undefined);
  const [categories, setCategories] = useState(["No Category"]);
  const [subCategories, setSubCategories] = useState(["No Sub-Category"]);
  const [alerts, setAlerts] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editMenuItem, setEditMenuItem] = useState(null);
  const [editPriceError, setEditPriceError] = useState(false);
  const [itemInfo, setItemInfo] = useState(null);


  function loadMenu() {
    API.get(`/menu/view`)
     .then((res) => {
       if (res.status < 300) {
         console.log('Success');
         console.log(res.data);
         setMenu(res.data.map((item) => [item.item_id, item.item_name, item.category, item.sub_category,
                                         parseFloat(item.price).toFixed(2), item.is_modification.toString(), item.display_item.toString(),
                                         item.display_image.toString(), item.feature_item.toString(), item.item_description]));
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
    
    API.get(`/menu/categories`)
      .then((res) => {
        if (res.status < 300) {
          console.log('Success');
          console.log(res.data);
          setCategories(res.data.map((item) => item.category).concat("No Category"));
        }
        else {
          console.log(res.data);
          setCategories(["No Category"]);
        }
      })
      .catch((error) => {
        console.log(error);
        setCategories(["No Category"]);
      });
  }

  function loadSubCategories(category) {
    API.get(`/menu/sub-categories?category=${category}`)
      .then((res) => {
        if (res.status < 300) {
          console.log('Success');
          console.log(res.data);
          setSubCategories(res.data.map((item) => item.sub_category).concat("No Sub-Category"));
        }
        else {
          console.log(res.data);
          setSubCategories(["No Sub-Category"]);
        }
      })
      .catch((error) => {
        console.log(error);
        setSubCategories(["No Sub-Category"]);
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
    setItemInfo([
        menuItem[0],
        menuItem[1],
        (!menuItem[2]) ? "No Category" : menuItem[2],
        (!menuItem[3]) ? "No Category" : menuItem[3],
        parseFloat(menuItem[4]).toFixed(2),
        (menuItem[5] === "true") ? true : false,
        (menuItem[6] === "true") ? true : false,
        (menuItem[7] === "true") ? true : false,
        (menuItem[8] === "true") ? true : false,
        menuItem[9]
    ]);
    loadSubCategories(menuItem[2]);
    setOpenEditDialog(true);
  };

  const handleEditCloseDialog = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) {
        return;
    }
    
    setOpenEditDialog(false);
    setEditMenuItem(null);
    setItemInfo(null);
    setSubCategories(["No Sub-Category"]);
    setEditPriceError(false);
  };

  const handleEditSubmit = () => {
    console.log("Submitted");
    handleEditCloseDialog();
  }

  const handleEditCancel = () => {
    console.log("Canceled");
    const new_alerts = [...alerts];
    new_alerts.unshift(
      {
        severity: 'info',
        text: `Canceled Edit of Item '${itemInfo[1]}'`
      }
    );
    setAlerts(new_alerts);

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
      name: 'Feature Item on Menu Board?',
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
            );
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
        <Dialog open={openEditDialog} onClose={handleEditCloseDialog} maxWidth={"md"} fullWidth={true} sx={{ maxHeight: "85%" }}>
          <DialogTitle>{`Edit Menu Item "${editMenuItem[1]}"`}</DialogTitle>

          <DialogContent sx={{overflowY: 'scroll'}}>
            {console.log(itemInfo)}
            <Stack spacing={3} sx={{ mt: 3 }}>
              <TextField
                required
                id="edit-name-field"
                label="Item Name"
                defaultValue={itemInfo[1]}
                onChange={(e) => { itemInfo[1] = e.target.value; setItemInfo([...itemInfo]); }}
              />
              <Autocomplete
                id="edit-category-field"
                freeSolo
                includeInputInList={true}
                isOptionEqualToValue={(option, value) => (option === value || (!value && option === "No Category")) }
                options={categories}
                value={itemInfo[2]}
                onChange={(e, newValue) => {
                    itemInfo[2] = (!newValue) ? "No Category" : newValue;
                    itemInfo[3] = "No Sub-Category";
                    if (categories.includes(newValue)) {
                        loadSubCategories(itemInfo[2]);
                    }
                    else {
                        setSubCategories(["No Sub-Category"])
                    }
                    setItemInfo([...itemInfo]);
                }}
                renderInput={(params) => <TextField {...params} label="Category" />}
              />
              <Autocomplete
                id="edit-subcategory-field"
                freeSolo
                includeInputInList={true}
                isOptionEqualToValue={(option, value) => (option === value || (!value && option === "No Sub-Category")) }
                options={subCategories}
                value={itemInfo[3]}
                onChange={(e, newValue) => { itemInfo[3] = (!newValue) ? "No Sub-Category" : newValue; setItemInfo([...itemInfo]); }}
                renderInput={(params) => <TextField {...params} label="Sub-Category" />}
              />
              <TextField
                required
                id="edit-price-field"
                label={"Price"}
                inputProps={{ inputMode: 'numeric' }}
                defaultValue={itemInfo[4]}
                onChange={(e) => {
                  if (!e.target.value.match(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)) {
                    e.preventDefault();
                    setEditPriceError(true);
                  }
                  else {
                    itemInfo[4] = parseFloat(e.target.value).toFixed(2);
                    setItemInfo([...itemInfo]); 
                    setEditPriceError(false);
                  }
                }}
                error={editPriceError}
                helperText={editPriceError ? "Must enter a valid dollar amount!" : " "}
              />
            </Stack>
            <FormGroup sx={{ alignItems: "flex-start", mt: 1, mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={itemInfo[5]}
                    onChange={(e) => {
                      if (e.target.checked) {
                        itemInfo[5] = true;
                      }
                      else {
                        itemInfo[5] = false;
                      }
                      setItemInfo([...itemInfo]);
                    }}
                  />
                }
                label="Item is a Modification?"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={itemInfo[6]}
                    onChange={(e) => {
                      if (e.target.checked) {
                        itemInfo[6] = true;
                      }
                      else {
                        itemInfo[6] = false;
                      }
                      setItemInfo([...itemInfo]);
                    }}
                  />
                }
                label="Item Displayed on Menu Board?"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={itemInfo[7]}
                    onChange={(e) => {
                      if (e.target.checked) {
                        itemInfo[7] = true;
                      }
                      else {
                        itemInfo[7] = false;
                      }
                      setItemInfo([...itemInfo]);
                    }}
                  />
                }
                label="Item's Image Displayed on Menu Board?"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={itemInfo[8]}
                    onChange={(e) => {
                      if (e.target.checked) {
                        itemInfo[8] = true;
                      }
                      else {
                        itemInfo[8] = false;
                      }
                      setItemInfo([...itemInfo]);
                    }}
                  />
                }
                label="Item Featured on Menu Board?"
                labelPlacement="start"
              />
            </FormGroup>
            <TextField
              required
              multiline
              fullWidth={true}
              id="edit-description-field"
              label="Item Description"
              defaultValue={itemInfo[9]}
              onChange={(e) => { itemInfo[9] = e.target.value; setItemInfo([...itemInfo]); }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleEditCancel}>Cancel</Button>
            <Button onClick={handleEditSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default MenuManagment