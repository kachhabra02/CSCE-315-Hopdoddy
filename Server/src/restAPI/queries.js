
//Common Queries
const getCatQuery = "SELECT DISTINCT Category FROM Menu WHERE Is_Modification=FALSE AND Is_Available ORDER BY Category ASC";
const getSubCategoriesQuery = "SELECT DISTINCT Sub_Category FROM Menu WHERE Category= $1 AND Is_Available ORDER BY Sub_Category ASC";
const getMenuItemsQuery = "SELECT * FROM Menu WHERE Category= $1 AND Sub_Category= $2 AND Is_Available ORDER BY Item_ID ASC";

//Manager Queries
const checkInventoryExists =  "SELECT invName FROM Inventory invName WHERE invName.Inventory_Name = $1";
const addInventoryItemQuery = "INSERT INTO Inventory (Inventory_Name, Price, Quantity, Unit) VALUES ( $1 , $2 , $3 , $4 )";
const removeInventoryItemQuery = "UPDATE Inventory Set Is_Available = FALSE WHERE Inventory_Name = $1";

const checkMenuItemExists = "SELECT menName FROM Menu menName WHERE menName.Item_Name = $1";
const removeMenuItemQuery = "UPDATE Menu Set Is_Available = FALSE WHERE Item_Name = $1";

/* TODO: Continuation:

// Common Queries

const getModifications = ; // ADD ME

// Manager Queries

const viewInventory = ; // ADD ME
const viewMenu = ; // ADD ME

const addInventoryItem = ; 
const changeInventoryItem = ; // ADD ME
const removeInventoryItem = ;

const addMenuItem = ; // ADD ME
const changeMenuItem = ; // ADD ME
const removeMenuItem = ;

// Report Queries
const getPopularPairs = ;
const getOrderHistory = ;
const getSalesReport = ;
const getRestockItems = ;
const getExcessReport = ;

// Cashier Queries

const placeTransaction = ;


// FIXME: Add my queries to the export list

*/

//Exporting Queries
module.exports = {
    getCatQuery,
    getSubCategoriesQuery,
    getMenuItemsQuery,
    checkInventoryExists,
    addInventoryItemQuery,
    removeInventoryItemQuery,
    checkMenuItemExists,
    removeMenuItemQuery,
};