import React, {useEffect, useState} from "react";
import CategoryList from "./cashier-subcomponents/CategoryList.js"
import SubcategoryList from "./cashier-subcomponents/SubcategoryList.js"
import TransactionList from "./cashier-subcomponents/TransactionList.js"
import ItemList from "./cashier-subcomponents/ItemList.js"

function Cashier() {
    const [categories, setCategories] = useState();
    const [subcategories, setSubcategories] = useState([]);
    const [currCategory, setCurrCategory] = useState();
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("/api/menu/categories").then(res => res.json()).then(
            res => setCategories(res)
        )
        // .then(() => console.log(categories))
    }, []);

    function getSubcategories(categoryName) {
        return () => {
            setSubcategories(null);
            setCurrCategory(categoryName);
            fetch("/api/menu/sub-categories?category=" + categoryName).then(res => res.json()).then(
               res => setSubcategories(res) 
            )
            // .then(() => console.log(subcategories))
        };
    }

    function getItems(subcategoryName) {
        return () => {
            setItems(null);
            fetch("/api/menu/items?category=" + currCategory + "&subcategory=" + subcategoryName).then(res => res.json()).then(
                res => setItems(res)
            )
            // .then(() => console.log(items))
        };
    }

    return (
        <div className="Cashier">
            {/* <NavBar />  */}
            <h1>This is the Cashier page</h1>
            {(categories === undefined) ? <p>Loading...</p> : <CategoryList categories={categories} clickHandler={getSubcategories}/>}       
            {(subcategories === null) ? <p>Loading...</p> : <SubcategoryList subcategories={subcategories} clickHandler={getItems}/>}
            {(items === null) ? <p>Loading...</p> : <ItemList items={items} />}
            <TransactionList />
        </div>
    );
}

export default Cashier;
