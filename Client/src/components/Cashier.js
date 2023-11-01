import React, {useEffect, useState} from "react";
import CategoryList from "./cashier-subcomponents/CategoryList.js";
import SubcategoryList from "./cashier-subcomponents/SubcategoryList.js";
import TransactionList from "./cashier-subcomponents/TransactionList.js";
import ItemList from "./cashier-subcomponents/ItemList.js";
import axios from "axios";

import "./cashier-subcomponents/Cashier.css";

function Cashier() {
    const [categories, setCategories] = useState();
    const [subcategories, setSubcategories] = useState([]);
    const [currCategory, setCurrCategory] = useState();
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [currOrder, setCurrOrder] = useState(0);

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
            setCurrCategory(categoryName);
            setSubcategories(null);
            setItems([]);
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

    function addOrder(item) {
        return () => setOrders(orders.concat([item]));
    }

    function removeOrder(index) {
        return () => setOrders(orders.toSpliced(index, 1));
    }

    return (
        <div className="Cashier">
            {/* <NavBar />  */}
            <h1>This is the Cashier page</h1>
            {(categories === undefined) ? <p>Loading...</p> : <CategoryList categories={categories} clickHandler={getSubcategories}/>}       
            {(subcategories === null) ? <p>Loading...</p> : <SubcategoryList subcategories={subcategories} clickHandler={getItems}/>}
            {(items === null) ? <p>Loading...</p> : <ItemList items={items} clickHandler={addOrder}/>}
            <TransactionList orders={orders} remover={removeOrder}/>
        </div>
    );
}

export default Cashier;
