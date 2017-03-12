#!/bin/bash

pkill node
echo "node halted."

pkill mongod
echo "Mongo halted."

service nginx stop
echo "Nginx halted."
