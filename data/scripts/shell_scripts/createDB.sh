#!/bin/bash

# This script creates the Database Tables
export PGPASSWORD="Password123"

username="csce315_905_02user"
database="csce315_905_02db"
serverName="csce-315-db.engr.tamu.edu"

psql -U $username -h $serverName -d $database -f ../sql_scripts/createTables.sql