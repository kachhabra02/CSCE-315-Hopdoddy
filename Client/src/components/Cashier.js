import React from "react";

function Cashier() {
    return (
        <div className="Cashier">
            <NavBar /> 
            <CategoryList />
            <SubcatetgoryList />
            <ItemList />
            <TransactionList />
        </div>
    );
}
