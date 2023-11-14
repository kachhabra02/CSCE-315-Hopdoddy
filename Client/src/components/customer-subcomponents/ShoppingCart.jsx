import React from "react";

import Dialog from "@mui/material/Dialog"
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import IconButton from '@mui/material/IconButton';
import { MdClose, MdOutlineShoppingCart} from "react-icons/md";

function ShoppingCart({open, onClose}) {
    return (
        <Dialog
          open={open}
          onClose={onClose}
        >
            <DialogTitle>
                {/* <MdOutlineShoppingCart/> */}
                Shopping Cart
                <IconButton onClick={onClose}>
                    <MdClose/>
                </IconButton>
            </DialogTitle>
            <DialogContent>

            </DialogContent>
        </Dialog>
    );
}

export default ShoppingCart;
