#!/bin/bash

# This script solely connects to the Database
export PGPASSWORD="Password123"

username="csce315_905_02user"
database="csce315_905_02db"
serverName="csce-315-db.engr.tamu.edu"

# psql -U $username -p $password -h $serverName -d $database
psql -U $username -h $serverName -d $database