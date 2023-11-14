import React, {useState} from "react";

import { MdOutlineShoppingCart } from "react-icons/md";
import Badge from '@mui/material/Badge';
// import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

import CartButton from "./customer-subcomponents/CartButton";

import useAPI from "./useAPI";
import CategoryAccordions from "./customer-subcomponents/CategoryAccordions";

function Customer({onUpdate}) {
    const [{categories, subcategories, items, currCategory, currSubcategory}, {getItems, getSubcategories}] = useAPI();

    // const orders = JSON.parse(localStorage.getItem("cart"));
    // const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

    return (
        <div className="Customer">
            {/* <IconButton size="large">
                <Badge badgeContent={cart?.length} color="success">
                    <MdOutlineShoppingCart/>
                </Badge>
            </IconButton> */}
            {/* <CartButton/> */}
            {(categories === undefined) 
                ? <div>Loading...</div>
                : <CategoryAccordions categories={categories} onUpdate={onUpdate} />
            }
        </div>
    );
}

export default Customer;