-- Need to update the serial values as they are not incremented in the copy
SELECT SETVAL('Inventory_Inventory_ID_seq', (SELECT MAX(Inventory_ID) FROM Inventory));

SELECT SETVAL('Menu_Item_ID_seq', (SELECT MAX(Item_ID) FROM Menu));

SELECT SETVAL('Employees_Employee_ID_seq', (SELECT MAX(Employee_ID) FROM Employees));

SELECT SETVAL('Transactions_Transaction_ID_seq', (SELECT MAX(Transaction_ID) FROM Transactions));

SELECT SETVAL('Order_List_Order_List_ID_seq', (SELECT MAX(Order_List_ID) FROM Order_List));
