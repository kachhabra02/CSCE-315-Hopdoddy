const pool = require('./db');
const queries = require('./queries');

//Common Functions from Project 2
const getCategories = (req, res) => {
    pool.query(queries.getCatQuery, (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
};

const getSubCategories = (req, res) => {
    const category = req.params.Category;
    pool.query(queries.getSubCategoriesQuery,[category],(error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
};

const getMenuItems = (req, res) => {
    const category = req.params.Category;
    const subCategory = req.params.SubCategory;
    pool.query(queries.getMenuItemsQuery,[category, subCategory],(error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
};
//Manager Functions from Project 2
const addInventoryItem = (req, res) => {
    const {inventory_name, price, quantity, unit} = req.body;

    //check if inventory name exists
    pool.query(queries.checkInventoryExists, [inventory_name], (error, results) => {
        if(results.rows.length){
            res.send("Inventory Item already Exists");
        }

        //addInventoryItem

        pool.query(queries.addInventoryItemQuery, [inventory_name, price, quantity, unit], (error, results) => {
            if(error){
                throw error;
            }
            res.status(201).send("Inventory Item added successfully!");
            console.log("Inventory Item created");
        } );
    });
};

module.exports = {
    getCategories,
    getSubCategories,
    getMenuItems,
    addInventoryItem,
};