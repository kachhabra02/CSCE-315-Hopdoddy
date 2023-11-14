import React, {useState} from "react";
import axios from "axios";

import Dialog from "@mui/material/Dialog"
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {MdClose, MdOutlineShoppingCart} from "react-icons/md";
import {BsFillTrash3Fill} from "react-icons/bs";
import { Icon } from "@mui/material";

function ShoppingCart({open, onClose, onUpdate}) {
    // maybe change to state variable
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

    function removeOrder(index) {
        return () => {
            const newCart = cart.toSpliced(index, 1);
            localStorage.setItem("cart", JSON.stringify(newCart));
            setCart(newCart);
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
                    onUpdate({})
                    console.log(res);
                }
            })
            // .then(() => setAlertStatus({open: true, status: "success"}))
            .catch(error => {
                console.log(error);
                // setAlertStatus({open: true, status: "error"})
            });
    }

    return (
        <Dialog
          open={open}
          onClose={onClose}
        >
            <DialogTitle>
                {/* <MdOutlineShoppingCart/> */}
                Shopping Cart
                <IconButton onClick={onClose} edge="end">
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
                            <ListItemText primary={item.item_name}/>
                        </ListItem>
                    )) || (
                        <ListItem>Cart is empty</ListItem>
                    )
                } </List>
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={placeTransaction}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ShoppingCart;
