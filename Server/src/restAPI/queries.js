
/****** MENU ******/
// Get categories
const getCatQuery = "SELECT DISTINCT Category FROM Menu WHERE Is_Modification = FALSE AND Is_Available ORDER BY Category ASC";

// Get subcategories
const getSubCategoriesQuery = "SELECT DISTINCT Sub_Category FROM Menu " +
                              "WHERE Category = $1 AND Is_Modification = FALSE AND Is_Available ORDER BY Sub_Category ASC";

// Get menu items
const getMenuItemsQuery = "Select Item_ID, Item_Name, Price FROM Menu " +
                          "WHERE Category = $1 AND Sub_Category = $2 AND Is_Modification = FALSE AND Is_Available " +
                          "ORDER BY Item_ID ASC";

// Get modifications
const getModificationsQuery = "SELECT Item_ID, Item_Name, Price FROM Menu WHERE Is_Modification = TRUE AND Is_Available AND " +
                              "(Category IS NULL OR (Category = $1 AND (Sub_Category IS NULL OR Sub_Category = $2))) AND " +
                              "Is_Valid_Modification($3, Item_ID) ORDER BY Item_ID ASC";

// View menu
const viewMenuQuery = "SELECT Item_ID, Item_Name, Category, Sub_Category, Price, Is_Modification FROM Menu " +
                      "WHERE Is_Available ORDER BY Item_ID ASC";

// Delete menu item
const deleteMenuItemQuery = "UPDATE Menu SET Is_Available = FALSE WHERE Item_ID = $1";

// Update menu item
function updateMenuItemQuery(hasName, hasPrice, hasMod) {
    const paramNum = 1;
    const query = "UPDATE Menu SET ";
    
    if (hasName) {
        query += `Item_Name = $${paramNum++}, `
    }

    query += `Category = $${paramNum++}`;
    query += `, Sub_Category = $${paramNum++}`;

    if (hasPrice) {
        query += `, Price = $${paramNum++}`;
    }

    if (hasMod) {
        query += `, Is_Modification = $${paramNum++}`;
    }

    query += ` WHERE Item_ID = $${paramNum}`;
    return query;
}

// Add menu item
function addMenuItemQueries(numIngredients) {
    const query_p1 = "INSERT INTO Menu (Item_Name, Category, Sub_Category, Price, Is_Modification) " +
                     "VALUES ($1, $2, $3, $4, $5) RETURNING Item_ID";
    
    const query_p2 = "INSERT INTO Ingredients_List (Item_ID, Inventory_ID, Quantity) VALUES ";
    for (let i = 0; i < numIngredients; i++) {
        if (i != numIngredients) {
            query_p2 += ", ";
        }

        query_p2 += `($${(3 * i) + 1}, $${(3 * i) + 2}, $${(3 * i) + 3})`;
    }

    return [query_p1, query_p2];
}


/****** INVENTORY ******/
// View inventory
const viewInventoryQuery = "SELECT Inventory_ID, Inventory_Name, Price, Quantity, Unit FROM Inventory " +
                           "WHERE Is_Available ORDER BY Inventory_ID ASC";

// Delete inventory item
const deleteInventoryItemQuery = "UPDATE Inventory SET Is_Available = FALSE WHERE Inventory_ID = $1";

// Update inventory item
// TODO
function updateInventoryItemQuery(hasName, hasPrice, hasQuant, hasUnit) {
    const paramNum = 1;
    const query = "UPDATE Inventory SET ";
    
    if (hasName) {
        query += `Inventory_Name = $${paramNum++}`
    }

    if (hasPrice) {
        if (paramNum > 1) {
            query += ", ";
        }

        query += `Price = $${paramNum++}`;
    }

    if (hasQuant) {
        if (paramNum > 1) {
            query += ", ";
        }

        query += `Quantity = $${paramNum++}`;
    }

    if (hasUnit) {
        if (paramNum > 1) {
            query += ", ";
        }

        query += `Unit = $${paramNum++}`;
    }

    query += ` WHERE Inventory_ID = $${paramNum}`;
    return query;
}

// Add inventory item
const addInventoryItemQuery = "INSERT INTO Inventory (Inventory_Name, Price, Quantity, Unit) VALUES ($1 , $2 , $3 , $4)";


/****** TRANSACTIONS ******/
// Place a transaction
// TODO

// Get order history
// TODO


/****** REPORTS ******/
// Generate "What Sells Together?" report
// TODO

// Generate sales report
// TODO

// Generate excess report
// TODO

// Generate restock report
// TODO

// Generate product usage report
// TODO


// Exporting Queries
module.exports = {
    getCatQuery,
    getSubCategoriesQuery,
    getMenuItemsQuery,
    getModificationsQuery,
    viewMenuQuery,
    deleteMenuItemQuery,
    updateMenuItemQuery,
    addMenuItemQueries,
    viewInventoryQuery,
    deleteInventoryItemQuery,
    updateInventoryItemQuery,
    addInventoryItemQuery,
    // getPopularPairsQuery,
    // getOrderHistoryQuery,
    // getSalesReportQuery,
    // getRestockItemsQuery,
    // getExcessReportQuery,
    // placeTransactionQuery,
};


// Manager Queries
// const viewInventoryQuery = ; // TODO: ADD ME


// const checkInventoryExists =  "SELECT invName FROM Inventory invName WHERE invName.Inventory_Name = $1";
// const addInventoryItemQuery = "INSERT INTO Inventory (Inventory_Name, Price, Quantity, Unit) VALUES ( $1 , $2 , $3 , $4 )";
// const updateInventoryItemQuery = ; // TODO: ADD ME
// const removeInventoryItemQuery = "UPDATE Inventory Set Is_Available = FALSE WHERE Inventory_Name = $1";


// Report Queries
// const getPopularPairsQuery = ; // TODO: ADD ME
// const getOrderHistoryQuery = ; // TODO: ADD ME
// const getSalesReportQuery = ; // TODO: ADD ME
// const getRestockItemsQuery = ; // TODO: ADD ME
// const getExcessReportQuery = ; // TODO: ADD ME

// Cashier Queries
// const placeTransactionQuery = ; // TODO: ADD ME


