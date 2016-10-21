# This file will prepare nginx to run our application on a Linux server.
# To run this on a Mac, you'll want to research additional configuration steps.
    # Please add the steps to configure it in here, though!

# Also, make sure you run this file as sudo.

if [ $(uname) != "Linux" ]; then
    echo "You're not on Linux! Halting the configuration processs...";
    exit;
fi

# First, let's get the site information loaded into nginx
cp config/nginx/mapping_justice /etc/nginx/sites-available
ln -s /etc/nginx/sites-available/mapping_justice /etc/nginx/sites-enabled/mapping_justice

# Restart nginx
service nginx restart;
