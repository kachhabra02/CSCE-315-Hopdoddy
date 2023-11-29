// import React, {useEffect, useState} from "react";
import React, {useState} from "react";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import CategoryList from "./cashier-subcomponents/CategoryList.js";
import SubcategoryList from "./cashier-subcomponents/SubcategoryList.js";
import TransactionList from "./cashier-subcomponents/TransactionList.js";
import ItemList from "./cashier-subcomponents/ItemList.js";
import "./cashier-subcomponents/Cashier.css";
import useAPI from "./useAPI.js";
import { Box, Button, Grid, Stack, styled } from "@mui/material";
import { Typography } from "@mui/material";

// const API = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL}/api`,
//   timeout: 10000 // 10 second timeout
// });

const FullHeightContainer = styled('div')({
  height: '80vh',
  width: '100%',
  padding: 20, // adjust as needed
  boxSizing: 'border-box',
});

const FullHeightGrid = styled(Grid)({
  height: '100%',
});

function Cashier() {
  const [orders, setOrders] = useState([]);
  const [alertStatus, setAlertStatus] = useState({open: false, status: "error"});

  const [{categories, subcategories, items, currCategory, currSubcategory}, {getItems, getSubcategories}] = useAPI();

  function addOrder(item) {
    return () => setOrders(orders.concat([item]));
  }

  function removeOrder(index) {
    return () => setOrders(orders.toSpliced(index, 1));
  }

  function placeTransaction() {
    axios.post(`${process.env.REACT_APP_API_URL}/api/transactions`, {
      // TODO: change employeeID to an actual ID obtained from logging in
      employeeID: 2,
      menuIDs: orders.map((item) => item.item_id)
    })
      .then((res) => {
        if (res.status === 200) {
          setOrders([]);
          console.log(res);
        }
      })
      .then(() => setAlertStatus({open: true, status: "success"}))
      .catch(error => {
        console.log(error);
        setAlertStatus({open: true, status: "error"})
      });
  }

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }   
    setAlertStatus({open: false, status: alertStatus.status});
  }

  return (
    <FullHeightContainer>
      <Typography variant="h3">
        Cashier Page
      </Typography>
      <FullHeightGrid container sx={{ border: 1 }}>
        <Grid item xs={5} sx={{ borderRight: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{height: '87%'}}>
            <TransactionList 
              orders={orders} 
              remover={removeOrder}
            />
          </Box>
          <Stack direction={'row'} spacing={2} sx={{flexGrow: 1, borderTop: 1, padding: 2}}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={placeTransaction}
            >
              SUBMIT
            </Button>
            <Button 
              variant="contained"
              color="secondary"
              onClick={() => {
                setOrders([]); 
                setAlertStatus({open: true, status: "canceled"});
              }}
            >
              CANCEL
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={7}>
          {(categories === undefined) 
            // ? <p>Loading...</p> 
            ? <CircularProgress/>
            : <CategoryList categories={categories} clickHandler={getSubcategories} selected={currCategory}/>
          }
          {(subcategories === null) 
            // ? <p>Loading...</p> 
            ? <Box sx={{borderTop: 1}}><CircularProgress/></Box>
            : <Box sx={{borderTop: 1}}><SubcategoryList subcategories={subcategories} clickHandler={getItems} selected={currSubcategory}/></Box>
          }
          {(items === null) 
            // ? <p>Loading...</p> 
            ? <Box sx={{borderTop: 1}}><CircularProgress/></Box>
            : <Box sx={{borderTop: 1}}><ItemList items={items} clickHandler={addOrder}/></Box>
          }
        </Grid>
      </FullHeightGrid>
      
      <Snackbar 
        open={alertStatus.open} 
        onClose={() => setAlertStatus({open: false, status: alertStatus.status})}
        autoHideDuration={5000}
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}
      //   sx={{width: "500%"}}
      >
        {(alertStatus.status === "success") 
          ? <Alert severity="success" sx={{width: "90vw"}} onClose={closeAlert}>Transaction Submitted Sucsessfully!</Alert>
          : (alertStatus.status === "canceled")
            ? <Alert severity="info" sx={{width: "90vw"}} onClose={closeAlert}>Transaction canceled</Alert>
            : <Alert severity="error" sx={{width: "90vw"}} onClose={closeAlert}>Error submitting transaction</Alert>
        }
        
      </Snackbar>
    </FullHeightContainer>
  );
}

export default Cashier;
