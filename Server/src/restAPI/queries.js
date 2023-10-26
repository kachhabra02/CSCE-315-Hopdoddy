
//Common Queries
const getCatQuery = "SELECT DISTINCT Category FROM Menu WHERE Is_Modification=FALSE AND Is_Available ORDER BY Category ASC";
const getSubCategoriesQuery = "SELECT DISTINCT Sub_Category FROM Menu WHERE Category= $1 AND Is_Available ORDER BY Sub_Category ASC";
const getMenuItemsQuery = "Select * FROM Menu WHERE Category= $1 AND Sub_Category= $2 AND Is_Available ORDER BY Item_ID ASC";

//Manager Queries
const checkInventoryExists =  "Select invName FROM Inventory invName WHERE invName.Inventory_Name = $1";
const addInventoryItemQuery = "INSERT INTO Inventory (Inventory_Name, Price, Quantity, Unit) VALUES ( $1 , $2 , $3 , $4 )";
const removeInventoryItemQuery = "UPDATE Inventory Set Is_Available = FALSE WHERE Inventory_Name = $1";


//Exporting Queries
module.exports = {
    getCatQuery,
    getSubCategoriesQuery,
    getMenuItemsQuery,
    checkInventoryExists,
    addInventoryItemQuery,
    removeInventoryItemQuery,
};