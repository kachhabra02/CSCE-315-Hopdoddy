import React, {useEffect, useState} from "react";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import CategoryList from "./cashier-subcomponents/CategoryList.js";
import SubcategoryList from "./cashier-subcomponents/SubcategoryList.js";
import TransactionList from "./cashier-subcomponents/TransactionList.js";
import ItemList from "./cashier-subcomponents/ItemList.js";
import "./cashier-subcomponents/Cashier.css";

const API = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    timeout: 10000 // 10 second timeout
});

function Cashier() {
    const [categories, setCategories] = useState();
    const [subcategories, setSubcategories] = useState([]);
    const [currCategory, setCurrCategory] = useState();
    const [currSubcategory, setCurrSubcategory] = useState();
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [alertStatus, setAlertStatus] = useState({open: false, status: "error"});

    useEffect(() => {
        API.get(`/menu/categories`)
            .then((res) => {
                if (res.status < 300) {
                    setCategories(res.data);
                }
                else {
                    console.log(res.data);
                    setCategories([{category: "Error retrieving categories"}]);
                }
            })
            .catch((error) => {
                console.log(error);
                setCategories([{category: "Error retrieving categories"}]);
            });
    }, []);

    function getSubcategories(categoryName) {
        return () => {
            setCurrCategory(categoryName);
            setCurrSubcategory(null)
            setSubcategories(null);
            setItems([]);
            API.get(`/menu/sub-categories?category=${categoryName}`)
                .then((res) => {
                    if (res.status < 300) {
                        setSubcategories(res.data);
                    }
                    else {
                        console.log(res.data);
                        setSubcategories([{sub_category: "Error retrieving subcategories"}]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setSubcategories([{sub_category: "Error retrieving subcategories"}]);
                });
        };
    }

    function getItems(subcategoryName) {
        return () => {
            setCurrSubcategory(subcategoryName);
            setItems(null);
            API.get(`/menu/items?category=${currCategory}&subcategory=${subcategoryName}`)
                .then((res) => {
                    if (res.status < 300) {
                        setItems(res.data);
                    }
                    else {
                        console.log(res.data);
                        setItems([{item_name: "Error retrieving items"}]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setItems([{item_name: "Error retrieving items"}]);
                });
        };
    }

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
        <div className="Cashier">
            {/* <NavBar />  */}
            <h1>This is the Cashier page</h1>
            {(categories === undefined) 
                // ? <p>Loading...</p> 
                ? <CircularProgress/>
                : <CategoryList categories={categories} clickHandler={getSubcategories} selected={currCategory}/>
            }       
            {(subcategories === null) 
                // ? <p>Loading...</p> 
                ? <CircularProgress/> 
                : <SubcategoryList subcategories={subcategories} clickHandler={getItems} selected={currSubcategory}/>
            }
            {(items === null) 
                // ? <p>Loading...</p> 
                ? <CircularProgress/> 
                : <ItemList items={items} clickHandler={addOrder}/>
            }
            <TransactionList orders={orders} remover={removeOrder}/>
            <div>
                <button onClick={placeTransaction}>SUBMIT</button>
                <button 
                  onClick={() => {
                    setOrders([]); 
                    setAlertStatus({open: true, status: "canceled"});
                  }}
                >
                    CANCEL
                </button>
            </div>
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
        </div>
    );
}

export default Cashier;
