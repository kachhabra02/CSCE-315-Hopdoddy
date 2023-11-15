import React, {useState} from "react";
import axios from "axios";

import Dialog from "@mui/material/Dialog"
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {MdClose, MdOutlineShoppingCart} from "react-icons/md";
import {BsFillTrash3Fill} from "react-icons/bs";

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const priceFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

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
            const newCart = cart.toSpliced(index, 1);
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
            // TODO: change employeeID to an actual ID obtained from logging in
            employeeID: 2,
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
            <DialogTitle sx={{"min-width": 250}}>
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
                          secondaryAction={(
                            <IconButton edge="end" size="small" onClick={removeOrder(i)}>
                                <BsFillTrash3Fill/>
                            </IconButton>
                          )}
                        >
                            {/* TODO: add icon (Avatar) ?? */}
                            <ListItemAvatar>
                                <Avatar 
                                  // Name like Goodnight/Good Cause -> goodnight-good_cause.jpg
                                  src={`/images/${item.item_name.replace(/\s+/g, '_').replace(/\//g, '-').toLowerCase()}.jpg`}
                                  alt={item.item_name}
                                  // falls back on children if src cannot be found
                                  children={<Avatar src="/images/default.jpg"/>}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={item.item_name} secondary={priceFormat.format(parseFloat(item.price))}/>
                        </ListItem>
                    )) || (
                        <ListItem>Cart is empty</ListItem>
                    )
                } </List>
            </DialogContent>
            <DialogActions>
                {cart && `Total: ${priceFormat.format(parseFloat(total()))}`}
                {cart && <Button variant="text" onClick={removeAll} color="error">Remove All</Button>}
                <Button variant="text" onClick={placeTransaction}>Submit</Button>
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
