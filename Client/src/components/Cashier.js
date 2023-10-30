import React, {useEffect, useState} from "react";
import CategoryList from "./cashier-subcomponents/CategoryList.js"
import SubcategoryList from "./cashier-subcomponents/SubcategoryList.js"
import TransactionList from "./cashier-subcomponents/TransactionList.js"
import ItemList from "./cashier-subcomponents/ItemList.js"

function Cashier() {
    // will be replaced with categories from API call
    // const TSTcategories = ["Burgers", "Fries", "Drinks", "Salads"];

    const [categories, setCategories] = useState();

    useEffect(() => {
        fetch("/api/menu/categories").then(res => res.json()).then(
            res => setCategories(res)
        )
        // .then(() => console.log(categories))
    }, []);

    return (
        <div className="Cashier">
            {/* <NavBar />  */}
            <h1>This is the Cashier page</h1>
            {(categories === undefined) ? <p>Loading...</p> : <CategoryList categories={categories}/>}          
            <SubcategoryList />
            <ItemList />
            <TransactionList />
        </div>
    );
}

export default Cashier;
