FROM node:6.9.2

WORKDIR /sfs

# Make everything available for start
ADD . /sfs

# Compile all projects
RUN apt-get update -qq && apt-get install -y apt-utils build-essential && npm install --production

# Set development environment as default
ENV NODE_ENV production

# Run default entry
CMD node server.js
