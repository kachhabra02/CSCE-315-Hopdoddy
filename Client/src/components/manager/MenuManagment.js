/**
 * This module provides functionalities for managing and displaying menu items in a restaurant application.
 * It includes functions for loading, editing, adding, and deleting menu items.
 * @module MenuManagement
 */

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
import { DataGrid } from '@mui/x-data-grid';

import axios from 'axios';

import ConfirmationOnClickElement from '../admin/ConfirmationOnClickElement';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 30000 // 30 second timeout
});


/**
 * MenuManagement component is responsible for managing and displaying menu items.
 * It provides functionalities such as loading menu items, editing, adding, and deleting items.
 * 
 * @returns {React.Component} A component for managing the restaurant's menu.
 */
function MenuManagment() {
  const [menu, setMenu] = useState(undefined);
  const [categories, setCategories] = useState(["No Category"]);
  const [subCategories, setSubCategories] = useState(["No Sub-Category"]);
  const [inventory, setInventory] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editMenuItem, setEditMenuItem] = useState(null);
  const [editPriceError, setEditPriceError] = useState(false);
  // const [deleteItemList, setDeleteItemList] = useState(null);
  const [itemInfo, setItemInfo] = useState(null);


  /**
   * Loads the full menu from the API.
   */
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

  /**
   * Loads subcategories for a given category.
   * 
   * @param {string} category - The category for which subcategories are to be loaded.
   */
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

  /**
   * Loads inventory items.
   */
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

  /**
   * Loads ingredients for a specific menu item.
   * 
   * @param {number} item_id - The ID of the menu item for which ingredients are to be loaded.
   */
  function loadIngredients(item_id) {
    API.get(`/menu/item/${item_id}`)
      .then((res) => {
        if (res.status < 300) {
          console.log('Success');
          console.log(res.data);
          setIngredients(res.data.map((item) => [item.ingredient_id, item.ingredient_name, item.ingredient_quantity, item.unit]));
        }
        else {
          console.log(res.data);
          setIngredients([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setIngredients([]);
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
    loadIngredients(menuItem[0]);
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
    setIngredients([]);
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
      item_description: (!itemInfo[9]) ? "No Description" : itemInfo[9],
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
        "No Description"
    ]);
    setIngredients([]);
    loadInventory();
    setOpenAddDialog(true);
  };

  const handleAddCloseDialog = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) {
        return;
    }
    
    setOpenAddDialog(false);
    setItemInfo(null);
    setSubCategories(["No Sub-Category"]);
    setIngredients([]);
    setEditPriceError(false);
  };

  const handleAddCancel = () => {
    console.log("Canceled");
    const new_alerts = [...alerts];
    new_alerts.unshift(
      {
        severity: 'info',
        text: `Canceled Addition of Item '${itemInfo[1]}'`
      }
    );
    setAlerts(new_alerts);

    handleAddCloseDialog();
  }

  const handleAddSubmit = () => {
    console.log("Submitted");
    const new_alerts = [...alerts];
    API.post(`/menu`, {
      item_name: itemInfo[1],
      category: (!itemInfo[2] || itemInfo[2] === "No Sub-Category") ? null : itemInfo[2],
      sub_category: (!itemInfo[3] || itemInfo[3] === "No Sub-Category") ? null : itemInfo[3],
      price: itemInfo[4],
      is_modification: itemInfo[5],
      display_item: itemInfo[6],
      display_image: itemInfo[7],
      feature_item: itemInfo[8],
      item_description: (!itemInfo[9]) ? "No Description" : itemInfo[9],
      ingredients: ingredients
    })
      .then((res) => {
        if (res.status < 300) {
          console.log(`Added Item '${itemInfo[1]}'`);
          new_alerts.unshift(
            {
              severity: 'success',
              text: `Successfully Added Item '${itemInfo[1]}'`
            }
          );

          loadMenu();
        }
        else {
          console.log(`Failed to Add Item '${itemInfo[1]}'`);
          new_alerts.unshift(
            {
              severity: 'error',
              text: `Failed to Add Item '${itemInfo[1]}'`
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
        new_alerts.unshift(
          {
            severity: 'error',
            text: `Failed to Add Item '${itemInfo[1]}'`
          }
        );
      });
    setAlerts(new_alerts);

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
        customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <Button
                onClick={() => handleEditClick(menu[dataIndex])}
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

        var confirmation = window.confirm(`Are you sure you would like to delete the following menu items?\n\n${item_info.map((i) => (i[1])).join(', ')}`);
        if (confirmation) {
            await Promise.all(item_info.map(async (item) => deleteItem(item, new_alerts)));
        }
        else {
            new_alerts.unshift(
                {
                  severity: 'info',
                  text: `Canceled Deletion of ${item_info.length} Item(s)`
                }
            );
        }  

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

      {/*deleteItemList && (<Box></Box>)*/}

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
                  if (!e.target.value.match(/^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/)) {
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
            <h1 id="ingredients-view">{"Ingredients (View Only)"}</h1>
            <DataGrid
              rows={ingredients.map((item) => ({id: item[0],name: item[1], quantity: item[2], unit: item[3]}))}
              columns={[
                { field: 'name', headerName: 'Ingredient Name', width: 200 },
                { field: 'quantity', headerName: 'Quantity', type: 'number', width: 150 },
                { field: 'unit', headerName: 'Unit', width: 150 },
              ]}
              initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 15, 25]}
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
            {console.log(ingredients)}
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
                id="add-price-field"
                label={"Price"}
                inputProps={{ inputMode: 'numeric' }}
                defaultValue={itemInfo[4]}
                onChange={(e) => {
                  if (!e.target.value.match(/^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/)) {
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
            <p>Note: You will not be able to edit the ingredients of the item after it is created.</p>
            <DataGrid
              getRowId={(row) => row.id}
              rows={inventory.map((item) => {
                const ingredient = ingredients.find((elem) => (elem.inventoryID === item[0]));
                if (ingredient === undefined) {
                    return {id: item[0], name: item[1], quantity: 0.0, unit: item[2]};
                }
                return {id: item[0], name: item[1], quantity: ingredient.quantity, unit: item[2]}
              })}
              columns={[
                { field: 'name', headerName: 'Ingredient Name', width: 200 },
                { field: 'quantity', headerName: 'Quantity Included', width: 200, editable: true },
                { field: 'unit', headerName: 'Unit', width: 150 },
              ]}
              processRowUpdate={(updatedRow, originalRow) => {
                const new_ing = [...ingredients];
                console.log(updatedRow);
                var new_quant = parseFloat(updatedRow.quantity);
                if (updatedRow.quantity.match(/^[-+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/)) {
                  const ind = new_ing.findIndex((elem) => (elem.inventoryID === updatedRow.id));
                  if (ind !== -1) {
                    if (new_quant === 0 || new_quant === 0.0) {
                      new_ing.splice(ind, 1);
                    }
                    else {
                      new_ing[ind].quantity = new_quant;
                    }
                  }
                  else if (new_quant !== 0 || new_quant !== 0.0) {
                    new_ing.unshift({
                      inventoryID: updatedRow.id,
                      quantity: new_quant
                    });
                  }
                }
                else {
                  new_quant = originalRow.quantity;
                }
                setIngredients(new_ing);
                updatedRow.quantity = new_quant;
                return updatedRow;
              }}
              onProcessRowUpdateError={(error) => { console.log(error) }}
              initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
            />
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