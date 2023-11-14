import React, {useState} from "react";

import { MdOutlineShoppingCart } from "react-icons/md";
import Badge from '@mui/material/Badge';
// import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

import ShoppingCart from "./ShoppingCart";

function CartButton() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <IconButton size="large" color="inherit" onClick={() => setIsOpen(true)}>
                <Badge badgeContent={cart?.length} color="success">
                    <MdOutlineShoppingCart/>
                </Badge>
            </IconButton>
            <ShoppingCart open={isOpen} onClose={() => setIsOpen(false)}/>
        </>
    );
}

export default CartButton;
