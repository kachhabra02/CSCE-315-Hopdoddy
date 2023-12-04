CREATE TABLE Inventory (
    Inventory_ID SERIAL,
    Inventory_Name VARCHAR(255) NOT NULL,
    Price DECIMAL NOT NULL,
    Quantity DECIMAL NOT NULL,
    Unit VARCHAR(255) NOT NULL,
    Is_Available BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (Inventory_ID)
);

CREATE TABLE Menu (
    Item_ID SERIAL,
    Item_Name VARCHAR(255) NOT NULL,
    Category VARCHAR(255) DEFAULT NULL,
    Sub_Category VARCHAR(255) DEFAULT NULL, 
    Price DECIMAL NOT NULL,
    Is_Modification BOOLEAN NOT NULL,
    Is_Available BOOLEAN DEFAULT TRUE,
    Display_Item BOOLEAN NOT NULL,
    Display_Image BOOLEAN NOT NULL,
    Display_Description BOOLEAN NOT NULL,
    Item_Description TEXT DEFAULT 'No description',
    PRIMARY KEY (Item_ID)
);

CREATE TABLE Employees(
    Employee_ID SERIAL,
    First_Name VARCHAR(255) NOT NULL,
    Last_Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Is_Manager BOOLEAN NOT NULL DEFAULT FALSE,
    Is_Admin BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (Employee_ID)
);

CREATE TABLE Transactions(
    Transaction_ID SERIAL,
    Transaction_Time TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP,
    Employee_ID INT NOT NULL,
    Total_Price DECIMAL NOT NULL DEFAULT 0.00,
    Order_Status VARCHAR(255) NOT NULL DEFAULT 'Pending',
    PRIMARY KEY (Transaction_ID),
    FOREIGN KEY (Employee_ID) REFERENCES Employees(Employee_ID)
);

CREATE TABLE Ingredients_List(
    Item_ID INT NOT NULL,
    Inventory_ID INT NOT NULL,
    Quantity DECIMAL NOT NULL,
    PRIMARY KEY (Item_ID, Inventory_ID),
    FOREIGN KEY (Item_ID) REFERENCES Menu(Item_ID),
    FOREIGN KEY (Inventory_ID) REFERENCES Inventory(Inventory_ID)
);

CREATE TABLE Order_List(
    Order_List_ID SERIAL,
    Item_ID INT NOT NULL,
    Transaction_ID INT NOT NULL,
    PRIMARY KEY (Order_List_ID),
    FOREIGN KEY (Item_ID) REFERENCES Menu(Item_ID),
    FOREIGN KEY (Transaction_ID) REFERENCES Transactions(Transaction_ID)
);
