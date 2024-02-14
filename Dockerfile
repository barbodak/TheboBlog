    # Use an official Node.js runtime as the base image
    FROM node:19

    # Set the working directory in the container
    WORKDIR /usr/src/app

    # Copy package.json and package-lock.json to the working directory
    COPY package*.json ./

    # Install dependencies
    RUN npm install

    # Copy the rest of the application code to the working directory
    COPY . .

    # Build the Vite application
    RUN npm run build

    # Expose the port your app runs on (change port number if your Vite configuration uses a different port)
    EXPOSE 3000

    # Command to run the application
