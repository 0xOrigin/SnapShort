# Base image
FROM node:20.10.0-alpine

# Setup environment variable
ENV DockerHOME=/home/app/web

# Set work directory
RUN mkdir -p $DockerHOME
RUN mkdir $DockerHOME/public

# Where your code lives
WORKDIR $DockerHOME

# Copy whole project to your docker home directory.
COPY .. $DockerHOME

RUN apk update \
   && apk add gcc musl-dev icu-data-full libgdiplus libx11-dev

# Run this command to install all dependencies
RUN npm install

USER node
# Port where the Node.js app runs from .env file
EXPOSE $PORT
