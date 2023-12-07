import {useEffect, useState} from "react";
import axios from "axios";

/**
 * Axios instance for making API requests.
 */
const API = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    timeout: 10000 // 10 second timeout
});

/**
 * Custom hook for interacting with the API.
 * This hook provides functions to fetch categories, subcategories, items, and modifications.
 * It is designed to be used across various components like Cashier and Customer.
 * 
 * @returns {Array} An array containing two elements: state and API functions.
 */
const useAPI = () => {
    const [categories, setCategories] = useState();
    const [subcategories, setSubcategories] = useState([]);
    const [currCategory, setCurrCategory] = useState();
    const [currSubcategory, setCurrSubcategory] = useState();
    const [items, setItems] = useState([]);
    const [modifications, setModifiactions] = useState();

    useEffect(() => {
        API.get(`/menu/categories`)
            .then((res) => {
                if (res.status < 300) {
                    setCategories(res.data);
                }
                else {
                    console.log(res.data);
                    setCategories([{category: "Error retrieving categories"}]);
                }
            })
            .catch((error) => {
                console.log(error);
                setCategories([{category: "Error retrieving categories"}]);
            });
    }, []);

    
    /**
     * Fetches subcategories for a given category.
     * @param {string} categoryName - The name of the category.
     * @returns {Function} A function to be invoked to perform the fetch operation.
     */
    function getSubcategories(categoryName) {
        return () => {
            setCurrCategory(categoryName);
            setCurrSubcategory(null)
            setSubcategories(null);
            setItems([]);
            API.get(`/menu/sub-categories?category=${categoryName}`)
                .then((res) => {
                    if (res.status < 300) {
                        setSubcategories(res.data);
                    }
                    else {
                        console.log(res.data);
                        setSubcategories([{sub_category: "Error retrieving subcategories"}]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setSubcategories([{sub_category: "Error retrieving subcategories"}]);
                });
        };
    }

    /**
     * Fetches items for a given subcategory (and optional category).
     * @param {string} subcategoryName - The name of the subcategory.
     * @param {string} [categoryName=null] - The name of the category (optional).
     * @returns {Function} A function to be invoked to perform the fetch operation.
     */
    function getItems(subcategoryName, categoryName = null) {
        return () => {
            setCurrSubcategory(subcategoryName);
            
            setItems(null);
            API.get(`/menu/items?category=${(categoryName === null) ? currCategory : categoryName}&subcategory=${subcategoryName}`)
                .then((res) => {
                    if (res.status < 300) {
                        setItems(res.data);
                    }
                    else {
                        console.log(res.data);
                        setItems([{item_name: "Error retrieving items"}]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setItems([{item_name: "Error retrieving items"}]);
                });
        };
    }

    /**
     * Fetches modifications for a given item ID, subcategory, and category.
     * @param {number} id - The ID of the item.
     * @param {string} subcategoryName - The name of the subcategory.
     * @param {string} categoryName - The name of the category.
     * @returns {Function} A function to be invoked to perform the fetch operation.
     */
    function getModifications(id, subcategoryName, categoryName) {
        return () => {
            setModifiactions(null)
            API.get(`/menu/modifications?category=${categoryName}&subcategory=${subcategoryName}&id=${id}`)
                .then((res) => {
                    if (res.status < 300) {
                        console.log(res.data)
                        setModifiactions(res.data);
                    } else {
                        console.log(res.data);
                        setModifiactions([{item_name: "Error retrieving items"}]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setModifiactions([{item_name: "Error retrieving items"}]);
                });
        };
    }

    return [
        {
            categories: categories,
            subcategories: subcategories,
            items: items,
            currCategory: currCategory,
            currSubcategory: currSubcategory,
            modifications: modifications
        },
        {
            getSubcategories: getSubcategories,
            getItems: getItems,
            getModifications: getModifications
        }
    ]
}

export default useAPI;