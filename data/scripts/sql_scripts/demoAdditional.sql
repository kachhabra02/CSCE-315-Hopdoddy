-- View all modification items in the menu
SELECT Item_ID, Item_Name AS Modification_Name, Price
    FROM Menu
    WHERE Is_Modification;


-- View ingredients in a certain menu item (the classic)
SELECT Inventory.Inventory_ID AS Ingredient_ID, Inventory_Name AS Ingredient_Name, Ingredient_Quantity, Unit 
    FROM (SELECT Inventory_ID, Quantity AS Ingredient_Quantity
            FROM Ingredients_List
            WHERE Item_ID = 1
         ) AS Ingredients
         LEFT JOIN Inventory ON Ingredients.Inventory_ID = Inventory.Inventory_ID;


-- Inventory usage in a given time window (Summer Break 2023)
SELECT Inventory.Inventory_ID, Inventory_Name, SUM(Ingredients_List.Quantity) AS Total_Usage, Unit
    FROM ((SELECT Item_ID
            FROM Order_List
            WHERE Order_List.Transaction_ID
                IN (SELECT Transaction_ID
                        FROM Transactions
                        WHERE Transaction_Time BETWEEN TIMESTAMP '2023-05-10 00:00:00' AND TIMESTAMP '2023-08-21 00:00:00'
                    )
            ) AS Items
            INNER JOIN Ingredients_List ON Items.Item_ID = Ingredients_List.Item_ID
          )
          LEFT JOIN Inventory ON Ingredients_List.Inventory_ID = Inventory.Inventory_ID
    GROUP BY Inventory.Inventory_ID
    ORDER BY Inventory.Inventory_ID ASC;


-- Show number of purchases of a certain menu item (the classic) by month
SELECT DATE_TRUNC('MONTH', Transaction_Time) AS Transaction_Month, COUNT(Item_ID) AS Num_Orders
    FROM (SELECT * FROM Order_List WHERE Item_ID = 1) AS Purchases
          LEFT JOIN Transactions ON Purchases.Transaction_ID = Transactions.Transaction_ID 
    GROUP BY Transaction_Month
    ORDER BY Transaction_Month DESC;


-- Rank employees by total of sales
SELECT Employees.Employee_ID AS ID_Number, First_Name, Last_Name, COUNT(Transaction_ID) AS Num_Transactions, SUM(Total_Price) AS Total_Sales
    FROM Transactions LEFT JOIN Employees ON Transactions.Employee_ID = Employees.Employee_ID
    GROUP BY Employees.Employee_ID
    ORDER BY Total_Sales DESC;


-- View all transactions by a certain employee (Josh), from newest to oldest
SELECT * FROM Transactions
    WHERE Employee_ID = 5
    ORDER BY Transaction_Time DESC;


-- Sum and count total sales in entire transaction history
SELECT SUM(Total_Price) as Total_Sales, COUNT(Transaction_ID) AS Num_Sales
    FROM Transactions;


-- Sum and count total sales between two dates (Summer Break 2023)
SELECT SUM(Total_Price) as Total_Sales, COUNT(Transaction_ID) AS Num_Sales
    FROM Transactions
    WHERE Transaction_Time BETWEEN TIMESTAMP '2023-05-10 00:00:00' AND TIMESTAMP '2023-08-21 00:00:00';


-- Select the 15 most expensive transactions
SELECT * FROM Transactions
    ORDER BY Total_Price DESC
    LIMIT 15;


-- Select 10 most recent transactions
SELECT * FROM Transactions
    ORDER BY Transaction_Time DESC
    LIMIT 10;


-- Select 10 oldest transactions
SELECT * FROM Transactions
    ORDER BY Transaction_Time ASC
    LIMIT 10;
