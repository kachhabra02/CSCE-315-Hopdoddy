-- Select count of orders grouped by week
SELECT DATE_TRUNC('WEEK', Transaction_Time) AS Transaction_Week, COUNT(Transaction_ID) AS Num_Orders
    FROM Transactions
    GROUP BY Transaction_Week
    ORDER BY Transaction_Week DESC;


-- Select count of orders, sum of order total grouped by hour
-- Note: If grouping by hour separated per day instead of aggregated, change EXTRACT(HOUR FROM Transaction_Time) to DATE_TRUNC('HOUR', Transaction_Time) 
SELECT EXTRACT(HOUR FROM Transaction_Time) AS Transaction_Hour, COUNT(Transaction_ID) AS Num_Orders, SUM(Total_Price) AS Hourly_Revenue
    FROM Transactions
    GROUP BY Transaction_Hour
    ORDER BY Transaction_Hour ASC;


-- Select top 10 sums of order total grouped by day in descending order
SELECT DATE_TRUNC('DAY', Transaction_Time) AS Transaction_Day, SUM(Total_Price) AS Daily_Revenue
    FROM Transactions
    GROUP BY Transaction_Day
    ORDER BY Daily_Revenue DESC
    LIMIT 10;


-- Select row count from inventory
SELECT COUNT(Inventory_ID) FROM Inventory;
