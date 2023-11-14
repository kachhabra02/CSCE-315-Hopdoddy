import React from "react";

import Dialog from "@mui/material/Dialog"
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import {MdClose, MdOutlineShoppingCart} from "react-icons/md";
import {BsFillTrash3Fill} from "react-icons/bs";
import { Icon } from "@mui/material";

function ShoppingCart({open, onClose}) {
    const cart = JSON.parse(localStorage.getItem("cart"));

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
                    cart.map((item) => (
                        <ListItem 
                            secondaryAction={(
                            <IconButton edge="end" size="small">
                                <BsFillTrash3Fill/>
                            </IconButton>
                            )}
                        >
                            <ListItemText primary={item.item_name}/>
                        </ListItem>
                    ))
                } </List>
            </DialogContent>
        </Dialog>
    );
}

export default ShoppingCart;
