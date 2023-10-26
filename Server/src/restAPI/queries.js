
// Common Queries
const getCatQuery = "SELECT DISTINCT Category FROM Menu WHERE Is_Modification=FALSE AND Is_Available ORDER BY Category ASC";
const getSubCategoriesQuery = "SELECT DISTINCT Sub_Category FROM Menu WHERE Category= $1 AND Is_Available ORDER BY Sub_Category ASC";
const getMenuItemsQuery = "SELECT * FROM Menu WHERE Category= $1 AND Sub_Category= $2 AND Is_Available ORDER BY Item_ID ASC";
// const getModificationsQuery = ; // TODO: Add me

// Manager Queries
// const viewInventoryQuery = ; // TODO: ADD ME
// const viewMenuQuery = ; // TODO: ADD ME

const checkInventoryExists =  "SELECT invName FROM Inventory invName WHERE invName.Inventory_Name = $1";
const addInventoryItemQuery = "INSERT INTO Inventory (Inventory_Name, Price, Quantity, Unit) VALUES ( $1 , $2 , $3 , $4 )";
// const changeInventoryItemQuery = ; // TODO: ADD ME
const removeInventoryItemQuery = "UPDATE Inventory Set Is_Available = FALSE WHERE Inventory_Name = $1";

const checkMenuItemExists = "SELECT menName FROM Menu menName WHERE menName.Item_Name = $1";
// const addMenuItemQuery = ; // TODO: ADD ME
// const changeMenuItemQuery = ; // TODO: ADD ME
const removeMenuItemQuery = "UPDATE Menu Set Is_Available = FALSE WHERE Item_Name = $1";

// Report Queries
// const getPopularPairsQuery = ; // TODO: ADD ME
// const getOrderHistoryQuery = ; // TODO: ADD ME
// const getSalesReportQuery = ; // TODO: ADD ME
// const getRestockItemsQuery = ; // TODO: ADD ME
// const getExcessReportQuery = ; // TODO: ADD ME

// Cashier Queries
// const placeTransactionQuery = ; // TODO: ADD ME


// Exporting Queries
module.exports = {
    getCatQuery,
    getSubCategoriesQuery,
    getMenuItemsQuery,
    // getModificationsQuery,
    // viewInventoryQuery,
    // viewMenuQuery,
    checkInventoryExists,
    addInventoryItemQuery,
    // changeInventoryItemQuery,
    removeInventoryItemQuery,
    checkMenuItemExists,
    // addMenuItemQuery,
    // changeMenuItemQuery,
    removeMenuItemQuery,
    // getPopularPairsQuery,
    // getOrderHistoryQuery,
    // getSalesReportQuery,
    // getRestockItemsQuery,
    // getExcessReportQuery,
    // placeTransactionQuery,
};