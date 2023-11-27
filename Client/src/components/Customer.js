import React from "react";

import useAPI from "./useAPI";
import CategoryAccordions from "./customer-subcomponents/CategoryAccordions";

function Customer({onUpdate}) {
    const [{categories}] = useAPI();

    // const orders = JSON.parse(localStorage.getItem("cart"));
    // const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

    return (
        <div className="Customer">
            {/* TODO: Snackbar Alert for adding item to cart */}
            {/* <CartButton/> */}
            {(categories === undefined) 
                ? <div>Loading...</div>
                : <CategoryAccordions categories={categories} onUpdate={onUpdate} />
            }
        </div>
    );
}

export default Customer;