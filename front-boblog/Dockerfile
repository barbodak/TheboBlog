# Use the official Node.js 16 image as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY front-boblog/package*.json ./

# Install dependencies
RUN npm install

# Bundle the source code inside the Docker image
COPY front-boblog .

# Make port 3000 available outside of this container
EXPOSE 3000

# Define the command to run the app
CMD [ "node", "app.js" ]
