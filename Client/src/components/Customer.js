import React, {useState} from "react";

import { MdOutlineShoppingCart } from "react-icons/md";
import Badge from '@mui/material/Badge';
import SvgIcon from '@mui/material/SvgIcon';

import useAPI from "./useAPI";
import CategoryAccordions from "./customer-subcomponents/CategoryAccordions";

function Customer() {
    const [{categories, subcategories, items, currCategory, currSubcategory}, {getItems, getSubcategories}] = useAPI();

    // const CategoryAccordions = () => categories.map(item => (
    //     <Accordion>
    //         <AccordionSummary expandIcon={<MdExpandMore/>}>
    //             {item.category}
    //         </AccordionSummary>
    //         <AccordionDetails>
    //             Testing, Testing, 1 2 3...
    //         </AccordionDetails>
    //     </Accordion>
    // ));

    const orders = JSON.parse(localStorage.getItem("cart"));
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

    return (
        <div className="Customer">
            <Badge badgeContent={cart?.length} color="secondary">
                <SvgIcon sx={{fontSize: 25}}>
                    <MdOutlineShoppingCart  />
                </SvgIcon>
            </Badge>
            {(categories === undefined) 
                ? <div>Loading...</div>
                : <CategoryAccordions categories={categories} updater={setCart}/>
            }
        </div>
    );
}

export default Customer;