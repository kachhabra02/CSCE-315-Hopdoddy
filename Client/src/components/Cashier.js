import React from "react";
import CategoryList from "./cashier-subcomponents/CategoryList.js"
import SubcategoryList from "./cashier-subcomponents/SubcategoryList.js"
import TransactionList from "./cashier-subcomponents/TransactionList.js"
import ItemList from "./cashier-subcomponents/ItemList.js"

function Cashier() {
    return (
        <div className="Cashier">
            {/* <NavBar />  */}
            <h1>This is the Cashier page</h1>
            <CategoryList />
            <SubcategoryList />
            <ItemList />
            <TransactionList />
        </div>
    );
}

export default Cashier;
