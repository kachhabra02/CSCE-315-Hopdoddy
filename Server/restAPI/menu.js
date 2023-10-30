// Necessary requirements
const express = require('express')
const router = express.Router()

// Retrieve connection pool
const pool = require('./db');

// Import SQL queries
const queries = require('./queries');


/***** /api/menu *****/
// Add menu item
router.post('/', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        
        // TODO: Send queries
        const {item_name, category, sub_category, price, is_modification, numIngredients, ingredients} = req.body;

        [menuQuery, ingrQuery] =  queries.addMenuItemQueries(numIngredients);

        const result = await client.query({
            text: menuQuery,
            values: [item_name, category, sub_category, price, is_modification]
            
        } );
        let menId = result.rows.at(0).item_id;
        console.log(menId);
        for(let i = 0; i < numIngredients; i++){
            client.query({
                text: ingrQuery,
                values: [menId, ingredients[i].inventoryID, ingredients[i].quantity]
            } );
        }


        res.status(201).send("Menu Item added successfully!");
        
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
});


/***** /api/menu/item/:id *****/
// Update menu item
router.put('/item/:id', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();
    const ID = req.params.id;
    const {name, category, subcategory, price, isMod} = req.body;

    let updateQuery = queries.updateMenuItemQuery(true, true, true);

    const result = await client.query({
        text: updateQuery,
        values: [name, category, subcategory, price, isMod, ID]
    } );
    // TODO: Send query
    res.status(200).send("Menu Item updated successfully!");

    client.release();

});

// Delete menu item
router.delete('/item/:id', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    const item_id = req.params.id;
    // TODO: Send query
    client.query(queries.deleteMenuItemQuery,[item_id], (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).send("Menu Item removed successfully!");
    } );

    client.release();
});


/***** /api/menu/categories *****/
// Get categories
router.get('/categories', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query
    pool.query(queries.getCatQuery, (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })

    client.release();
});


/***** /api/menu/sub-categories *****/
// Get subcategories
router.get('/sub-categories', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query
    const category = req.query.Category;
    pool.query(queries.getSubCategoriesQuery,[category],(error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })

    client.release();
});


/***** /api/menu/items *****/
// Get menu items
router.get('/items', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query
    const category = req.query.Category;
    const subCategory = req.query.SubCategory;
    pool.query(queries.getMenuItemsQuery,[category, subCategory],(error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })


    client.release();
});


/***** /api/menu/modifications *****/
// Get modifications
router.get('/modifications', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query
    const category = req.query.Category;
    const subCategory = req.query.SubCategory;
    const menuId = req.query.id;
    pool.query(queries.getModificationsQuery,[category, subCategory, menuId],(error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })

    client.release();
});


/***** /api/menu/view *****/
// View entire menu
router.get('/view', async (req, res) => {
    // TODO: Get necessary info from request

    const client = await pool.connect();

    // TODO: Send query
    pool.query(queries.viewMenuQuery,(error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })

    client.release();
});


// Export URI router
module.exports = router