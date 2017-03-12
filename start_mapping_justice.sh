#!/bin/bash

# This file must remain in the project root directory to spin up the
# application properly.

PATH_PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PATH_LOG_DIRECTORY=$PATH_PROJECT_ROOT/logs
PATH_USERDATA=$PATH_PROJECT_ROOT/userdata
PATH_MONGO_EXEC_DIR=$PATH_PROJECT_ROOT/bin

DATE="$(date +%s)"
mkdir $PATH_LOG_DIRECTORY 2> /dev/null

exec 1>"$PATH_LOG_DIRECTORY"/log_db_$DATE 2>&1

cd $PATH_MONGO_EXEC_DIR
mongod --dbpath "$PATH_USERDATA" --port 27017 --smallfiles &
sleep 5

exec 1>"$PATH_LOG_DIRECTORY"/log_site_$DATE 2>&1

cd $PATH_PROJECT_ROOT
service nginx start
npm start &
