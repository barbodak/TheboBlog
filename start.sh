#!/bin/sh

# Start Node.js app in the background
node /node-app/server.js &

# Start NGINX in the foreground
nginx -g "daemon off;"

