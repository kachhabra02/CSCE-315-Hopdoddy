#!/bin/bash

# This script initializes/creates our Database Triggers for inventory
export PGPASSWORD="Password123"

username="csce315_905_02user"
database="csce315_905_02db"
serverName="csce-315-db.engr.tamu.edu"

psql -U $username -h $serverName -d $database -f ../sql_scripts/createTriggers.sql