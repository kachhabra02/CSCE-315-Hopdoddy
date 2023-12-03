import React from "react";

import useAPI from "./useAPI";
// import CategoryAccordions from "./customer-subcomponents/CategoryAccordions";
import SideCategoryList from "./customer-subcomponents/SideCategoryList";
import ItemGrid from "./customer-subcomponents/ItemGrid";

import Fab from '@mui/material/Fab';
import CartButton from "./customer-subcomponents/CartButton";

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
                : <SideCategoryList categories={categories} onUpdate={onUpdate} itemGetter={getItems} 
                    sx={{"width": 250, 
                         "max-height": "calc(100vh - 64px)",
                         overflow: "auto",
                        //  float: "left",
                          position: "fixed"
                    }}
                  />
            }
            <div style={{paddingLeft: 250}}>
                <ItemGrid items={items} onUpdate={onUpdate}
                  sx={{float: "left", width: "calc(100% - 250px)", margin: "auto"}}
                />
            </div>
            <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16}}>
                <CartButton onUpdate={onUpdate}/>
            </Fab>
        </div>
    );
}

export default Customer;