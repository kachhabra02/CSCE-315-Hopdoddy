import React, { useState } from "react";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import CategoryList from "./cashier-subcomponents/CategoryList.js";
import SubcategoryList from "./cashier-subcomponents/SubcategoryList.js";
import TransactionList from "./cashier-subcomponents/TransactionList.js";
import ItemList from "./cashier-subcomponents/ItemList.js";
import "./cashier-subcomponents/Cashier.css";
import useAPI from "./useAPI.js";
import { Box, Button, Grid, Stack, Typography, styled } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TransactionTracking from "./cashier-subcomponents/TransactionTracking.js";
import { useAuth0 } from "@auth0/auth0-react";

// const API = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL}/api`,
//   timeout: 10000 // 10 second timeout
// });

const FullHeightContainer = styled('div')({
  height: '80vh',
  width: '100%',
  padding: 0,
  boxSizing: 'border-box',
});

const FullHeightGrid = styled(Grid)({
  height: '100%',
});

/**
 * Main cashier component for handling orders, transactions, and user interactions.
 * 
 * Utilizes various sub-components like CategoryList, SubcategoryList, TransactionList, and ItemList for different functionalities.
 * Also uses custom hooks and Material-UI components for UI and state management.
 */
function Cashier() {
  const [orders, setOrders] = useState([]);
  const [alertStatus, setAlertStatus] = useState({open: false, status: "error"});

  const [{categories, subcategories, items, currCategory, currSubcategory}, {getItems, getSubcategories}] = useAPI();
  
  const [value, setValue] = useState(0);

  const {user} = useAuth0();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function addOrder(item) {
    return () => setOrders(orders.concat([item]));
  }

  function removeOrder(index) {
    return () => setOrders(orders.toSpliced(index, 1));
  }

  function placeTransaction() {
    axios.post(`${process.env.REACT_APP_API_URL}/api/transactions`, {
      // TODO: change email to an actual email obtained from logging in
      email: (user.email) ? user.email : "tmholt02@tamu.edu",
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
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Cashier Ordering" {...a11yProps(0)} />
          <Tab label="Order Tracking" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <FullHeightContainer>
          <FullHeightGrid container sx={{ border: 1 }}>
            <Grid item xs={4} sx={{ borderRight: 1, flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{height: '87%'}}>
                <TransactionList 
                  orders={orders} 
                  remover={removeOrder}
                />
              </Box>
              <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1, borderTop: 1, padding: 2}}>
                <Stack direction={'row'} spacing={2} sx={{height: '100%'}}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={placeTransaction}
                  >
                    <CheckCircleIcon />
                  </Button>
                  <Button 
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setOrders([]); 
                      setAlertStatus({open: true, status: "canceled"});
                    }}
                  >
                    <DeleteForeverIcon />
                  </Button>
                  <Box sx={{flexGrow: 1}} />
                  <Box sx={{paddingRight: 2}}>
                    <Typography variant="h5">
                      Total:
                    </Typography>
                    <Typography variant="h6">
                      { (() => {
                        let totalPrice = orders?.reduce((total, item) => {
                          return total + Number(item.price);
                        }, 0);
                        let formatedPrice = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice);
                        return formatedPrice;
                      })() }
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={8} sx={{ height: '100%' }}>
              {(categories === undefined) 
                ? <CircularProgress/>
                : <CategoryList categories={categories} clickHandler={getSubcategories} selected={currCategory}/>
              }
              {(subcategories === null) 
                ? <Box sx={{borderTop: 1}}><CircularProgress/></Box>
                : <Box sx={{borderTop: 1}}><SubcategoryList subcategories={subcategories} clickHandler={getItems} selected={currSubcategory}/></Box>
              }
              {(items === null) 
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
          >
            {(alertStatus.status === "success") 
              ? <Alert severity="success" sx={{width: "90vw"}} onClose={closeAlert}>Transaction Submitted Sucsessfully!</Alert>
              : (alertStatus.status === "canceled")
                ? <Alert severity="info" sx={{width: "90vw"}} onClose={closeAlert}>Transaction canceled</Alert>
                : <Alert severity="error" sx={{width: "90vw"}} onClose={closeAlert}>Error submitting transaction</Alert>
            }
          </Snackbar>
        </FullHeightContainer>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TransactionTracking />
      </CustomTabPanel>
    </>
  );
}

/**
 * Custom tab panel component for managing different views in the cashier interface.
 * 
 * @param {Object} props - The props passed to the CustomTabPanel component.
 * @param {number} props.value - The current tab value.
 * @param {number} props.index - The index of the tab.
 * @param {React.ReactNode} props.children - The children elements of the tab panel.
 * @returns The rendered tab panel component.
 */
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

/**
 * Utility function for accessibility properties of tabs.
 * 
 * @param {number} index - Index of the tab for which the properties are generated.
 * @returns {Object} Accessibility properties for the tab.
 */
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default Cashier;
