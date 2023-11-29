import React from "react";

import useAPI from "./useAPI";
// import CategoryAccordions from "./customer-subcomponents/CategoryAccordions";
import SideCategoryList from "./customer-subcomponents/SideCategoryList";
import ItemGrid from "./customer-subcomponents/ItemGrid";

function Customer({onUpdate}) {
    const [{categories, items}, {getItems}] = useAPI();

    // const orders = JSON.parse(localStorage.getItem("cart"));
    // const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

    return (
        <div 
          className="Customer" 
        //   style={{width: "95%", margin: "auto", "padding-top": 10}}
        >
            {/* TODO: Snackbar Alert for adding item to cart */}
            {/* <CartButton/> */}
            {(categories === undefined) 
                ? <div>Loading...</div>
                // : <CategoryAccordions categories={categories} onUpdate={onUpdate} />
                : <SideCategoryList categories={categories} onUpdate={onUpdate} sx={{"width": 250, float: "left"}} itemGetter={getItems}/>
            }
            <ItemGrid items={items} onUpdate={onUpdate}
              sx={{float: "left", width: "calc(100% - 250px)", margin: "auto"}}
            />
        </div>
    );
}

export default Customer;