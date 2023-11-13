import {useEffect, useState} from "react";
import axios from "axios";

const API = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    timeout: 10000 // 10 second timeout
});

// Custom hook that calls API functions
// Can be used from both Cashier and Customer
const useAPI = () => {
    const [categories, setCategories] = useState();
    const [subcategories, setSubcategories] = useState([]);
    const [currCategory, setCurrCategory] = useState();
    const [currSubcategory, setCurrSubcategory] = useState();
    const [items, setItems] = useState([]);

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

    function getItems(subcategoryName) {
        return () => {
            setCurrSubcategory(subcategoryName);
            setItems(null);
            API.get(`/menu/items?category=${currCategory}&subcategory=${subcategoryName}`)
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

    return [
        {
            categories: categories,
            subcategories: subcategories,
            items: items,
            currCategory: currCategory,
            currSubcategory: currSubcategory
        },
        {
            getSubcategories: getSubcategories,
            getItems: getItems,
            getItemsBySubcategory: (subcategoryName, category) => {
                // setCurrCategory(category);
                setItems(null);
                API.get(`/menu/items?category=${category}&subcategory=${subcategoryName}`)
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
            }
        }
    ]
}

export default useAPI;