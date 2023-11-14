import React from "react";

import { MdOutlineShoppingCart } from "react-icons/md";
import Badge from '@mui/material/Badge';
// import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

function CartButton() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    // const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

    // useLayoutEffect(() => {
    //     // cart = JSON.parse(localStorage.getItem("cart"));
    //     setCart(JSON.parse(localStorage.getItem("cart")));
    // }, [])

    return (
        <IconButton size="large">
            <Badge badgeContent={cart?.length} color="success">
                <MdOutlineShoppingCart/>
            </Badge>
        </IconButton>
    );
}

export default CartButton;
