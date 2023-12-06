import React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
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
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import axios from 'axios';

import ConfirmationOnClickElement from '../admin/ConfirmationOnClickElement';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 30000 // 30 second timeout
});


function MenuManagment() {
  const [menu, setMenu] = useState(undefined);
  const [categories, setCategories] = useState(["No Category"]);
  const [subCategories, setSubCategories] = useState(["No Sub-Category"]);
  const [inventory, setInventory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
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

  function loadInventory() {
    API.get(`/inventory`)
      .then((res) => {
        if (res.status < 300) {
          console.log('Success');
          console.log(res.data);
          setInventory(res.data.map((item) => [item.inventory_id, item.inventory_name, item.unit]));
        }
        else {
          console.log(res.data);
          setInventory([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setInventory([]);
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
        (!menuItem[3]) ? "No Sub-Category" : menuItem[3],
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
    const new_alerts = [...alerts];
    API.put(`/menu/item/${itemInfo[0]}`, {
      item_name: itemInfo[1],
      category: (!itemInfo[2] || itemInfo[2] === "No Sub-Category") ? null : itemInfo[2],
      sub_category: (!itemInfo[3] || itemInfo[3] === "No Sub-Category") ? null : itemInfo[3],
      price: itemInfo[4],
      is_modification: itemInfo[5],
      display_item: itemInfo[6],
      display_image: itemInfo[7],
      feature_item: itemInfo[8],
      item_description: itemInfo[9],
    })
      .then((res) => {
        if (res.status < 300) {
          console.log(`Edited Item '${editMenuItem[1]}'`);
          new_alerts.unshift(
            {
              severity: 'success',
              text: `Successfully Edited Item '${editMenuItem[1]}'`
            }
          );

          loadMenu();
        }
        else {
          console.log(`Failed to Edit Item '${editMenuItem[1]}'`);
          new_alerts.unshift(
            {
              severity: 'error',
              text: `Failed to Edit Item '${editMenuItem[1]}'`
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
        new_alerts.unshift(
          {
            severity: 'error',
            text: `Failed to Edit Item '${editMenuItem[1]}'`
          }
        );
      });
    setAlerts(new_alerts);

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


  const handleAddClick = () => {
    setItemInfo([
        0,
        "Enter Item Name",
        "No Category",
        "No Sub-Category",
        0.00,
        false,
        false,
        false,
        false,
        []
    ]);
    setOpenEditDialog(true);
  };

  const handleAddCloseDialog = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) {
        return;
    }
    
    setOpenAddDialog(false);
    setItemInfo(null);
    setSubCategories(["No Sub-Category"]);
    setEditPriceError(false);
    loadInventory();
  };

  const handleAddCancel = () => {
    console.log("Canceled");
    /*
    const new_alerts = [...alerts];
    new_alerts.unshift(
      {
        severity: 'info',
        text: `Canceled Edit of Item '${itemInfo[1]}'`
      }
    );
    setAlerts(new_alerts);
    */

    handleAddCloseDialog();
  }

  const handleAddSubmit = () => {
    console.log("Submitted");
    /*
    const new_alerts = [...alerts];
    API.put(`/menu/item/${itemInfo[0]}`, {
      item_name: itemInfo[1],
      category: (!itemInfo[2] || itemInfo[2] === "No Sub-Category") ? null : itemInfo[2],
      sub_category: (!itemInfo[3] || itemInfo[3] === "No Sub-Category") ? null : itemInfo[3],
      price: itemInfo[4],
      is_modification: itemInfo[5],
      display_item: itemInfo[6],
      display_image: itemInfo[7],
      feature_item: itemInfo[8],
      item_description: itemInfo[9],
    })
      .then((res) => {
        if (res.status < 300) {
          console.log(`Edited Item '${editMenuItem[1]}'`);
          new_alerts.unshift(
            {
              severity: 'success',
              text: `Successfully Edited Item '${editMenuItem[1]}'`
            }
          );

          loadMenu();
        }
        else {
          console.log(`Failed to Edit Item '${editMenuItem[1]}'`);
          new_alerts.unshift(
            {
              severity: 'error',
              text: `Failed to Edit Item '${editMenuItem[1]}'`
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
        new_alerts.unshift(
          {
            severity: 'error',
            text: `Failed to Edit Item '${editMenuItem[1]}'`
          }
        );
      });
    setAlerts(new_alerts);
    */

    handleAddCloseDialog();
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
      name: 'Edit Menu Item',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <Button
                onClick={() => handleEditClick(menu[tableMeta.rowIndex])}
                variant='outlined'
                color='inherit'
                startIcon={<EditIcon/>}
                children={'Edit'}
              />
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
      
      <br/><br/>

      {menu === undefined ? (<Box></Box>) :
        <Button
          onClick={() => handleAddClick()}
          variant='outlined'
          color='success'
          startIcon={<AddCircleIcon color="success" />}
          children={'Add Menu Item'}
        />
      }

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
            <ConfirmationOnClickElement
              Element={Button} 
              variant='outlined' 
              title='Discard Changes?'
              body='Any changes you have made will be discarded.'
              color='error'
              confirmColor='warning'
              ask={true}
              onClick={handleEditCancel}
              children={<CancelIcon/>}
            />
            <ConfirmationOnClickElement
              Element={Button} 
              variant='outlined' 
              title='Save Changes?'
              body='Any changes you made will be saved to the menu.'
              color='success'
              onClick={handleEditSubmit}
              children={<CheckCircleIcon/>}
            />
          </DialogActions>
        </Dialog>
      )}
      

      {itemInfo && (
        <Dialog open={openAddDialog} onClose={handleAddCloseDialog} maxWidth={"md"} fullWidth={true} sx={{ maxHeight: "85%" }}>
          <DialogTitle>{`Add New Menu Item`}</DialogTitle>

          <DialogContent sx={{overflowY: 'scroll'}}>
            {console.log(itemInfo)}
            <Stack spacing={3} sx={{ mt: 3 }}>
              <TextField
                required
                id="add-name-field"
                label="Item Name"
                defaultValue={itemInfo[1]}
                onChange={(e) => { itemInfo[1] = e.target.value; setItemInfo([...itemInfo]); }}
              />
              <Autocomplete
                id="add-category-field"
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
                id="add-subcategory-field"
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
                id="add-price-field"
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
              id="add-description-field"
              label="Item Description"
              defaultValue={itemInfo[9]}
              onChange={(e) => { itemInfo[9] = e.target.value; setItemInfo([...itemInfo]); }}
            />
            <h1 id="ingredients-header">Edit ingredients For {`"${itemInfo[1]}"`}</h1>
          </DialogContent>

          <DialogActions>
            <ConfirmationOnClickElement
              Element={Button} 
              variant='outlined' 
              title='Discard Changes?'
              body='Any changes you have made will be discarded, and the menu item will not be added.'
              color='error'
              confirmColor='warning'
              ask={true}
              onClick={handleAddCancel}
              children={<CancelIcon/>}
            />
            <ConfirmationOnClickElement
              Element={Button} 
              variant='outlined' 
              title='Save Changes?'
              body='Any changes you made will be saved to the menu as a new menu item.'
              color='success'
              onClick={handleAddSubmit}
              children={<CheckCircleIcon/>}
            />
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default MenuManagment