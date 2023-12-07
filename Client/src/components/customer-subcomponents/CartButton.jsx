import React, {useState} from "react";

import { MdOutlineShoppingCart } from "react-icons/md";
import Badge from '@mui/material/Badge';
// import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

import ShoppingCart from "./ShoppingCart";

/**
 * This module provides a CartButton component for the application, allowing users to view
 * and interact with items in their shopping cart.
 * @module CartButton
 */

/**
 * Renders a button with a shopping cart icon. The button includes a badge showing the number of items in the cart.
 * Clicking the button opens the ShoppingCart component.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.onUpdate - Function to call when the cart needs to be updated.
 * @returns {React.Component} The cart button component.
 */
function CartButton({onUpdate}) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <IconButton size="large" color="inherit" onClick={() => setIsOpen(true)}>
                <Badge badgeContent={cart?.filter(item => !item?.is_modification).length} color="error">
                    <MdOutlineShoppingCart/>
                </Badge>
            </IconButton>
            <ShoppingCart open={isOpen} onClose={() => setIsOpen(false)} onUpdate={onUpdate} />
        </>
    );
}

export default CartButton;
