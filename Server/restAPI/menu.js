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
    // Perform transaction
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        
        // Get information for query
        const {item_name, category, sub_category, price, is_modification, display_item, display_image,
               item_description, ingredients} = req.body;

        [menuQuery, ingrQuery] =  queries.addMenuItemQueries(ingredients.length);

        const result = await client.query({
            text: menuQuery,
            values: [item_name, category, sub_category, price, is_modification, display_item, display_image, item_description]
        });
        
        let menId = result.rows.at(0).item_id;
        let ing_vals = [];
        
        for(let i = 0; i < ingredients.length; i++) {
            ing_vals.push(menId);
            ing_vals.push(ingredients[i].inventoryID);
            ing_vals.push(ingredients[i].quantity);
        }

        client.query({
            text: ingrQuery,
            values: ing_vals
        });

        res.status(200).send("Menu Item added successfully!");
        await client.query('COMMIT');
      } catch (err) {
        res.status(400).send("Error sending query: " + err.message);
        await client.query('ROLLBACK');
      } finally {
        client.release();
      }
});


/***** /api/menu/item/:id *****/
// Update menu item
router.put('/item/:id', async (req, res) => {
    // Get necessary info from request
    const ID = req.params.id;
    const {item_name, category, sub_category, price, is_modification, display_item, display_image, item_description} = req.body;

    // Send query
    let updateQuery = {
        text: queries.updateMenuItemQuery((item_name !== null), (price !== null), (is_modification !== null)),
        values: [item_name, category, sub_category, price, is_modification, display_item, display_image, item_description, ID]
    };

    const client = await pool.connect();
    const result = await client.query(updateQuery, (error, results) => {
        if (error) {
            res.status(400).send("Error sending query: " + error.message);
            return;
        }

        res.status(200).send("Menu Item updated successfully!");
    });
    client.release();
});

// Delete menu item
router.delete('/item/:id', async (req, res) => {
    // Get necessary info from request
    const item_id = req.params.id;
    
    // Send query
    const client = await pool.connect();
    client.query(queries.deleteMenuItemQuery, [item_id], (error, results) => {
        if(error) {
            res.status(400).send("Error sending query: " + error.message);
            return;
        }
        
        res.status(200).send("Menu Item removed successfully!");
    });
    client.release();
});


/***** /api/menu/categories *****/
// Get categories
router.get('/categories', async (req, res) => {
    // Send query
    const client = await pool.connect();
    client.query(queries.getCatQuery, (error, results) => {
        if(error) {
            res.status(400).send("Error sending query: " + error.message);
            return;
        }
        
        res.status(200).json(results.rows);
    });
    client.release();
});


/***** /api/menu/sub-categories *****/
// Get subcategories
router.get('/sub-categories', async (req, res) => {
    // Get necessary info from request
    if (!req.query.category) {
        res.status(400).send("Must provide category!");
        return;
    }
    const category = req.query.category;

    // Send query
    const client = await pool.connect();
    client.query(queries.getSubCategoriesQuery, [category], (error, results) => {
        if(error) {
            res.status(400).send("Error sending query: " + error.message);
            return;
        }
        
        res.status(200).json(results.rows);
    });
    client.release();
});


/***** /api/menu/items *****/
// Get menu items
router.get('/items', async (req, res) => {
    // Get necessary info from request
    if (!req.query.category) {
        res.status(400).send("Must provide category!");
        return;
    }
    const category = req.query.category;

    if (!req.query.subcategory) {
        res.status(400).send("Must provide subcategory!");
        return;
    }
    const subCategory = req.query.subcategory;

    // Send query
    const client = await pool.connect();
    client.query(queries.getMenuItemsQuery, [category, subCategory], (error, results) => {
        if(error) {
            res.status(400).send("Error sending query: " + error.message);
            return;
        }
        
        res.status(200).json(results.rows);
    });
    client.release();
});


/***** /api/menu/modifications *****/
// Get modifications
router.get('/modifications', async (req, res) => {
    // Get necessary info from request
    if (!req.query.category) {
        res.status(400).send("Must provide category!");
        return;
    }
    const category = req.query.category;

    if (!req.query.subcategory) {
        res.status(400).send("Must provide subcategory!");
        return;
    }
    const subCategory = req.query.subcategory;

    if (!req.query.id) {
        res.status(400).send("Must provide item ID (id)!");
        return;
    }
    const menuId = req.query.id;

    // Send query    
    const client = await pool.connect();
    client.query(queries.getModificationsQuery, [category, subCategory, menuId], (error, results) => {
        if(error){
            res.status(400).send("Error sending query: " + error.message);
            return;
        }
        
        res.status(200).json(results.rows);
    });
    client.release();
});


/***** /api/menu/view *****/
// View entire menu
router.get('/view', async (req, res) => {
    // Send query
    const client = await pool.connect();    
    client.query(queries.viewMenuQuery, (error, results) => {
        if(error) {
            res.status(400).send("Error sending query: " + error.message);
            return;
        }
        
        res.status(200).json(results.rows);
    });
    client.release();
});


// Export URI router
module.exports = router
