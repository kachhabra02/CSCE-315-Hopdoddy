
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
    var paramNum = 1;
    var query = "UPDATE Menu SET ";
    
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
    var query_p1 = "INSERT INTO Menu (Item_Name, Category, Sub_Category, Price, Is_Modification) " +
                     "VALUES ($1, $2, $3, $4, $5) RETURNING Item_ID";
    
    var query_p2 = "INSERT INTO Ingredients_List (Item_ID, Inventory_ID, Quantity) VALUES ";
    for (let i = 0; i < numIngredients; i++) {
        if (i != 0) {
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
function updateInventoryItemQuery(hasName, hasPrice, hasQuant, hasUnit) {
    var paramNum = 1;
    var query = "UPDATE Inventory SET ";
    
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
function placeTransactionQueries(numItemsOrdered) {
    var query_p1 = "INSERT INTO Transactions (Employee_ID) VALUES ($1) RETURNING Transaction_ID";
    
    var query_p2 = "INSERT INTO Order_List (Transaction_ID, Item_ID) VALUES ";
    for (let i = 0; i < numItemsOrdered; i++) {
        if (i != 0) {
            query_p2 += ", ";
        }

        query_p2 += `($${(2 * i) + 1}, $${(2 * i) + 2})`;
    }

    return [query_p1, query_p2];
}

// Get order history
const getOrderHistoryQuery = "SELECT Transactions.Transaction_ID AS Trans_ID, Transaction_Time, Employee_ID, Total_Price, " +
                             "ARRAY_AGG(Menu.Item_ID) AS Item_IDs, ARRAY_AGG(Item_Name) AS Item_Names FROM Order_List " +
                             "LEFT JOIN Transactions ON Order_List.Transaction_ID = Transactions.Transaction_ID " +
                             "LEFT JOIN Menu ON Order_List.item_id = Menu.Item_ID " +
                             "WHERE Transaction_Time BETWEEN $1 AND $2 " +
                             "GROUP BY Transactions.Transaction_ID ORDER BY Transaction_Time DESC LIMIT $3";


/****** REPORTS ******/
// Generate "What Sells Together?" report
const getPopularPairsQuery = "SELECT First_Item_ID, First_Item_Name, Second_Item_ID, m2.Item_Name AS Second_Item_Name, Num_Orders FROM " +
                             "(SELECT First_Item_ID, m1.Item_Name AS First_Item_Name, m1.Is_Available AS Is_Available_1, Second_Item_ID, " +
                             "Num_Orders FROM (SELECT o1.Item_ID AS First_Item_ID, o2.Item_ID AS Second_Item_ID, " +
                             "COUNT(DISTINCT o1.Order_List_ID) AS Num_Orders FROM Order_List o1 " +
                             "INNER JOIN Order_List o2 ON o1.Transaction_ID = o2.Transaction_ID AND o1.Item_ID < o2.Item_ID " +
                             "WHERE (SELECT Transaction_Time FROM Transactions WHERE Transaction_ID = o1.Transaction_ID) " +
                             "BETWEEN $1 AND $2 GROUP BY o1.Item_ID, o2.Item_ID ORDER BY Num_Orders DESC, " +
                             "o1.Item_ID ASC, o2.Item_ID ASC) AS Pairs LEFT JOIN Menu m1 ON First_Item_ID = m1.Item_ID) AS Named_Pairs " +
                             "LEFT JOIN Menu m2 ON Second_Item_ID = m2.Item_ID WHERE Is_Available_1 AND m2.Is_Available LIMIT $3";

// Generate sales report
const getSalesReportQuery = "SELECT Item_ID, Item_Name, Price, Is_Modification, Num_Sales FROM (Menu LEFT JOIN " +
                            "(SELECT Item_ID AS ID, COUNT(*) AS Num_Sales FROM (SELECT Item_ID FROM Order_List WHERE Transaction_ID IN " +
                            "(SELECT Transaction_ID FROM Transactions WHERE Transaction_Time BETWEEN $1 AND $2)) " +
                            "AS Orders GROUP BY Item_ID) AS Sale_Counts ON Menu.Item_ID = Sale_Counts.ID) AS Menu_Counts " +
                            "WHERE Is_Available ORDER BY Item_ID ASC";

// Generate excess report
const getExcessReportQuery = "SELECT Inventory_ID, Inventory_Name, Quantity AS Current_Quantity, Unit, COALESCE(Total_Usage, 0) AS Actual_Usage, " +
                             "(0.1 * (Quantity + COALESCE(Total_Usage, 0))) AS Target_Usage FROM (SELECT Inventory_ID AS Ing_ID, " +
                             "SUM(Ingredients_List.Quantity) AS Total_Usage FROM ((SELECT Item_ID FROM Order_List " +
                             "LEFT JOIN Transactions ON Order_List.Transaction_ID = Transactions.Transaction_ID " +
                             "WHERE Transaction_Time >= $1) AS Items INNER JOIN Ingredients_List " +
                             "ON Items.Item_ID = Ingredients_List.Item_ID) GROUP BY Inventory_ID) AS Usage " +
                             "RIGHT JOIN Inventory ON Ing_ID = Inventory_ID WHERE Is_Available AND " +
                             "COALESCE(Total_Usage, 0) < 0.1 * (Quantity + COALESCE(Total_Usage, 0)) ORDER BY Inventory_ID ASC";

// Generate restock report
const getRestockReportQuery = "SELECT Inventory_ID, Inventory_Name, Quantity AS Current_Quantity, Avg_Weekly_Usage, " +
                              "(Avg_Weekly_Usage - Quantity) AS Recommended_Reorder FROM (SELECT Ing_ID, AVG(Weekly_Usage) AS Avg_Weekly_Usage " +
                              "FROM (SELECT Inventory_ID AS Ing_ID, SUM(Ingredients_List.Quantity) AS Weekly_Usage, DATE_TRUNC('WEEK', " +
                              "Transaction_Time) AS Transaction_Week FROM ((SELECT Item_ID, Transaction_Time FROM Order_List " +
                              "LEFT JOIN Transactions ON Order_List.Transaction_ID = Transactions.Transaction_ID) AS Items " +
                              "INNER JOIN Ingredients_List ON Items.Item_ID = Ingredients_List.Item_ID) " +
                              "GROUP BY Inventory_ID, Transaction_Week) AS Usage GROUP BY Ing_ID ORDER BY Ing_ID ASC) AS Avg_Usage " +
                              "RIGHT JOIN Inventory ON Ing_ID = Inventory_ID WHERE Quantity < Avg_Weekly_Usage";

// Generate product usage report
const getProductUsageQuery = "SELECT Inventory_ID, Inventory_Name, COALESCE(Total_Usage, 0) AS Total_Usage, Unit FROM (SELECT Inventory_ID AS " +
                             "Ing_ID, SUM(Ingredients_List.Quantity) AS Total_Usage FROM ((SELECT Item_ID FROM Order_List " +
                             "LEFT JOIN Transactions ON Order_List.Transaction_ID = Transactions.Transaction_ID WHERE " +
                             "Transaction_Time BETWEEN $1 AND $2) AS Items " +
                             "INNER JOIN Ingredients_List ON Items.Item_ID = Ingredients_List.Item_ID) GROUP BY Inventory_ID) AS Usage " +
                             "RIGHT JOIN Inventory ON Ing_ID = Inventory_ID WHERE Is_Available ORDER BY Inventory_ID ASC";


// Export Queries
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
    placeTransactionQueries,
    getOrderHistoryQuery,
    getPopularPairsQuery,
    getSalesReportQuery,
    getExcessReportQuery,
    getRestockReportQuery,
    getProductUsageQuery
};