#!/bin/bash

# This script loads the Database Tables
export PGPASSWORD="Password123"

username="csce315_905_02user"
database="csce315_905_02db"
serverName="csce-315-db.engr.tamu.edu"

# FIXME: Currently has no functionality until we create our loadTables.sql file
# psql -U $username -h $serverName -d $database -f ../sql_scripts/???