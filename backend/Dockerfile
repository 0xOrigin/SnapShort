FROM node:20.10.0-alpine


ENV DockerHOME=/home/app/backend

# Set work directory
RUN mkdir -p $DockerHOME
RUN mkdir $DockerHOME/public

# Where your backend app lives in your docker container
WORKDIR $DockerHOME

# Copy the current directory contents into the container at $DockerHOME
COPY .. $DockerHOME

# Install necessary packages on the container
RUN apk update && apk add gcc musl-dev icu-data-full libgdiplus libx11-dev

# Run this command to install all dependencies for the Node.js app
RUN npm install

# Use the node user to run the app
USER node

# Make port 3000 available to the world outside this container
EXPOSE 3000
