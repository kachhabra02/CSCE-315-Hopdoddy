import React, {useState} from "react";
import axios from "axios";

import Dialog from "@mui/material/Dialog"
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {MdClose, MdClear} from "react-icons/md";
import {BsFillTrash3Fill} from "react-icons/bs";

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const priceFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

/**
 * This module provides a React component for displaying a shopping cart with items.
 * Users can view and manage items in the cart, remove items, and submit their transaction.
 * @module ShoppingCart
 */

/**
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Whether the shopping cart is open.
 * @param {Function} props.onClose - Function to call when the popup requests to be closed.
 * @param {Function} props.onUpdate - Function to call when an update is needed - is drilled from App which forces a rerender of the NavBar and ShoppingCart.
 * @returns {React.Component} A shopping cart with options to manage items and submit a transaction.
 */
function ShoppingCart({open, onClose, onUpdate}) {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
    const [alertStatus, setAlertStatus] = useState({open: false, status: "error"});

    const removeAll = () => {
        localStorage.removeItem("cart");
        setCart(null);
        setAlertStatus({open: true, status: "canceled"});
    }

    function removeOrder(index) {
        return () => {
            // find first non-modification after index
            const numMods = (cart[index]?.is_modification 
                ? 0
                : cart.findIndex((item, i) => i > index && !item?.is_modification) - index - 1
            );
            // console.log(numMods)
            const newCart = cart.toSpliced(index, 1 + (numMods >= 0 ? numMods : (cart.length - index)));
            if (newCart.length === 0) {
                localStorage.removeItem("cart");
                setCart(null);
            } else {
                localStorage.setItem("cart", JSON.stringify(newCart));
                setCart(newCart);
            }
        };
    }

    function placeTransaction() {
        axios.post(`${process.env.REACT_APP_API_URL}/api/transactions`, {
            // TODO: change email to an actual email obtained from logging in?
            email: "iamacustomer@kiosk.com",
            menuIDs: cart?.map((item) => item.item_id)
        })
            .then((res) => {
                if (res.status === 200) {
                    // setOrders([]);
                    localStorage.removeItem("cart")
                    setAlertStatus({open: true, status: "success"})
                    setCart(null)
                    // onUpdate({})
                    console.log(res);
                }
            })
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

    const total = (() => {
        let currTotal = 0;
        // console.log(cart)
        for (const item in cart) {
            // console.log(cart[item].price)
            currTotal += parseFloat(cart[item].price);
        }
        // console.log(currTotal)
        return currTotal;
    });

    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
        >
            <DialogTitle sx={{"min-width": 375}}>
                {/* <MdOutlineShoppingCart/> */}
                Shopping Cart
                {/* <Divider orientation="vertical" variant="middle" flexItem/> */}
                {/* {cart && `Total: ${priceFormat.format(parseFloat(total))}`} */}
                <IconButton 
                  onClick={onClose} 
                //   edge="end"
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                  }}
                >
                    <MdClose/>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <List> {
                    cart?.map((item, i) => (
                        <ListItem 
                          key={i}
                          secondaryAction={(
                            <IconButton edge="end" size="small" color="error" onClick={removeOrder(i)}>
                                {item?.is_modification ? <MdClear/> : <BsFillTrash3Fill/>}
                            </IconButton>
                          )}
                        >
                            {/* TODO: add icon (Avatar) ?? */}
                            {!item?.is_modification && (
                                <ListItemAvatar>
                                    <Avatar 
                                    // Name like Goodnight/Good Cause -> goodnight-good_cause.jpg
                                    src={`/images/${item.item_name.replace(/\s+/g, '_').replace(/\//g, '-').toLowerCase()}.jpg`}
                                    alt={item.item_name}
                                    // falls back on children if src cannot be found
                                    children={<Avatar src="/images/default.jpg"/>}
                                    />
                                </ListItemAvatar>
                            )}
                            {item?.is_modification 
                                ? <ListItemText secondary={`+ ${item.item_name} - ${priceFormat.format(parseFloat(item.price))}`} sx={{pl: 2}}/>
                                : <ListItemText primary={item.item_name} secondary={priceFormat.format(parseFloat(item.price))}/>
                            }
                            
                        </ListItem>
                    )) || (
                        <ListItem>Cart is empty</ListItem>
                    )
                } </List>
            </DialogContent>
            <DialogActions>
                {cart && <span style={{paddingRight: 4}}>{`Total: ${priceFormat.format(parseFloat(total()))}`}</span>}
                {cart && <Button variant="contained" onClick={removeAll} color="error">Remove All</Button>}
                <Button variant="contained" onClick={placeTransaction}>Submit</Button>
            </DialogActions>
        </Dialog>
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
      </>
    );
}

export default ShoppingCart;
