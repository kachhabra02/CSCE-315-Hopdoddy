import React, { useState } from "react";

import useAPI from "./useAPI";
// import CategoryAccordions from "./customer-subcomponents/CategoryAccordions";
import SideCategoryList from "./customer-subcomponents/SideCategoryList";
import ItemGrid from "./customer-subcomponents/ItemGrid";
import ModificationPanel from "./customer-subcomponents/ModificationPanel";

import "./customer-subcomponents/Customer.css";

function Customer({onUpdate}) {
    const [{categories, items, modifications}, {getItems, getModifications}] = useAPI();
    const [selected, setSelected] = useState({category: null, subcategory: null});
    // const getModificationsByID = (id) => getModifications(id, selected?.subcategory, selected?.category);
    const [isModOpen, setIsModOpen] = useState(false);
    const [moddedItem, setModdedItem] = useState(null);
    const openModPanel = (id) => (item) => () => {
        console.log(selected?.category, selected?.subcategory, id)
        getModifications(id, selected?.subcategory, selected?.category)();
        setModdedItem(item);
        setIsModOpen(true);
    }

    // const orders = JSON.parse(localStorage.getItem("cart"));
    // const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
    // console.log(document.getElementById("testdiv")?.getBoundingClientRect().width)
    // console.log(document.getElementById("grid")?.getBoundingClientRect().width)
    console.log(selected)

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
                : <SideCategoryList categories={categories} onUpdate={onUpdate} itemGetter={getItems} subcategorySelector={setSelected}
                    sx={{"width": 250, 
                         maxHeight: "calc(100vh - 64px)",
                         overflow: "auto",
                        //  float: "left",
                          position: "fixed"
                    }}
                  />
            }
            <div style={{paddingLeft: 250}} id="testdiv">
                <ItemGrid items={items} onUpdate={onUpdate} id="grid" currSelected={selected} modifier={openModPanel}
                  sx={{float: "left", width: "100%", margin: "auto"}}
                />
            </div>
            {/* <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16}}>
                <CartButton onUpdate={onUpdate}/>
            </Fab> */}
            <ModificationPanel item={moddedItem} open={isModOpen} onClose={() => setIsModOpen(false)} modifications={modifications} onUpdate={onUpdate}/>
        </div>
    );
}

export default Customer;