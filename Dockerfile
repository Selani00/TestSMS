# Get the base image
FROM node:20

# Set the working directory
WORKDIR /app

# copy the package.json file
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the port
EXPOSE 5500

# Start the application
CMD [ "npm" ,"start" ]