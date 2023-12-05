import React, {useState} from "react";

import { MdOutlineShoppingCart } from "react-icons/md";
import Badge from '@mui/material/Badge';
// import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

import ShoppingCart from "./ShoppingCart";

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
