!/bin/bash

# This script drops, creates, and initializes triggers for Database
export PGPASSWORD="Password123"

username="csce315_905_02user"
database="csce315_905_02db"
serverName="csce-315-db.engr.tamu.edu"

# Connects to DB, then dropping and creating the tables
psql -U $username -h $serverName -d $database -f ../sql_scripts/dropTables.sql -f ../sql_scripts/createTables.sql

# Calls Python script to generate our transactions (Order_List.csv & Transactions.csv)
python3 ../generate_transactions.py

# "Load" the data, so we just pull from our .csv files

menu="../../files/Menu.csv"
inventory="../../files/Inventory.csv"
employees="../../files/Employees.csv"
ingrList="../../files/Ingredients_List.csv"
transactions="../../files/Transactions.csv"
ordList="../../files/Order_List.csv"

# NEED to load tables for Menu, Inventory, & Employees first
psql -U $username -h $serverName -d $database -c "\copy Menu from $menu CSV HEADER" -c "\copy Inventory from $inventory CSV HEADER" -c "\copy Employees from $employees CSV HEADER"

# Followed by bridge tables for Ingredients_List & Transactions
psql -U $username -h $serverName -d $database -c "\copy Ingredients_List from $ingrList CSV HEADER" -c "\copy Transactions from $transactions CSV HEADER"

# LASTLY load Order_List
psql -U $username -h $serverName -d $database -c "\copy Order_List from $ordList CSV HEADER"

# Now we update the primary key sequence based on the copied data
psql -U $username -h $serverName -d $database -f ../sql_scripts/updateSerials.sql

# Now we create the triggers
psql -U $username -h $serverName -d $database -f ../sql_scripts/createTriggers.sql

# Now we create the functions and finish script
psql -U $username -h $serverName -d $database -f ../sql_scripts/createFunctions.sql