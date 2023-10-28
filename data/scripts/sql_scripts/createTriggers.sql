-- Trigger for building total price of order
-- Create/Replace function used by trigger
CREATE OR REPLACE FUNCTION Increase_Total()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
    AS
$$
BEGIN
    UPDATE Transactions SET Total_Price = Total_Price + Menu_Item.Price
    FROM (SELECT Price FROM Menu WHERE Item_ID = NEW.Item_ID) AS Menu_Item
    WHERE Transaction_ID = NEW.Transaction_ID;

    RETURN NEW;
END;
$$;

-- Create/Replace trigger
DROP TRIGGER IF EXISTS Add_To_Total ON Order_List;
CREATE TRIGGER Add_To_Total
    AFTER INSERT ON Order_List
    FOR EACH ROW
    EXECUTE PROCEDURE Increase_Total();


-- Trigger for decreasing inventory based on order
-- Create/Replace function used by trigger
CREATE OR REPLACE FUNCTION Decrease_Inventory()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
    AS
$$
BEGIN
    WITH Ingredients AS
        (SELECT Inventory_ID AS Ing_ID, Quantity AS Ing_Quant FROM Ingredients_List WHERE Item_ID = NEW.Item_ID)
    UPDATE Inventory SET Quantity = Quantity - Ing_Quant
    FROM Ingredients
    WHERE Inventory_ID = Ing_ID;

    RETURN NEW;
END;
$$;

-- Create/Replace trigger
DROP TRIGGER IF EXISTS Update_Inventory ON Order_List;
CREATE TRIGGER Update_Inventory
    AFTER INSERT ON Order_List
    FOR EACH ROW
    EXECUTE PROCEDURE Decrease_Inventory();
