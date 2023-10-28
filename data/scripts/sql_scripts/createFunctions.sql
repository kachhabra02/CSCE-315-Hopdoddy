-- Create function needed for modification verification
CREATE OR REPLACE FUNCTION Is_Valid_Modification(Menu_ID INTEGER, Mod_ID INTEGER)
    RETURNS BOOLEAN
    LANGUAGE PLPGSQL
    AS
$$
DECLARE
    Conflict_Count INTEGER;
BEGIN
    SELECT COUNT(*) INTO Conflict_Count
        FROM (SELECT Inventory_ID, Quantity
              FROM (SELECT * FROM Ingredients_List WHERE Item_ID = Mod_ID) AS Ingredients
              WHERE Quantity < 0.0
             ) AS Removals
        WHERE Inventory_ID NOT IN (SELECT Inventory_ID FROM Ingredients_List WHERE Item_ID = Menu_ID);
    
    RETURN Conflict_Count = 0;
END;
$$;
