# Use the official Nginx image as the base image
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the Nginx configuration file into the container
COPY nginx.conf /etc/nginx/conf.d

# Copy the static content (HTML, CSS, JS) into the container
COPY ./colorCube /usr/share/nginx/html
COPY output.css /usr/share/nginx/html
COPY 9B0846CF26E8C4B3874B6C6D72149C69.txt /usr/share/nginx/cert

# Expose port 80 to the outside
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
