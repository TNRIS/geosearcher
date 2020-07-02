# pull official base image
FROM node:12-alpine

# set working directory
WORKDIR /home/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# install app dependencies
RUN npm install

# add app
COPY . .

EXPOSE 3000

# start app
CMD ["npm", "start"]