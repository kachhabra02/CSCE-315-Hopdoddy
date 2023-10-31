import React, {useEffect, useState} from "react";
import CategoryList from "./cashier-subcomponents/CategoryList.js";
import SubcategoryList from "./cashier-subcomponents/SubcategoryList.js";
import TransactionList from "./cashier-subcomponents/TransactionList.js";
import ItemList from "./cashier-subcomponents/ItemList.js";
import axios from "axios";

function Cashier() {
    const [categories, setCategories] = useState();
    const [subcategories, setSubcategories] = useState([]);
    const [currCategory, setCurrCategory] = useState();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/menu/categories`)
            .then((res) => {
                if (res.status < 300) {
                    setCategories(res.data);
                }
            })
            .catch( error => console.log(error) );
    }, []);

    function getSubcategories(categoryName) {
        return () => {
            setSubcategories(null);
            setCurrCategory(categoryName);
            axios.get(`${process.env.REACT_APP_API_URL}/api/menu/sub-categories?category=${categoryName}`)
                .then((res) => {
                    if (res.status < 300) {
                        setSubcategories(res.data);
                    }
                })
                .catch( error => console.log(error) );
        };
    }

    function getItems(subcategoryName) {
        return () => {
            setItems(null);
            axios.get(`${process.env.REACT_APP_API_URL}/api/menu/items?category=${currCategory}&subcategory=${subcategoryName}`)
                .then((res) => {
                    if (res.status < 300) {
                        setItems(res.data);
                    }
                })
                .catch( error => console.log(error) );
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
