# pull official base image
FROM node:12-alpine

# create the app directories
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# set working directory
WORKDIR /home/node/app

COPY package*.json ./

# switch to the non-root user node
USER node

# install app dependencies
RUN npm install

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY --chown=node . .

EXPOSE 3000

# start app
CMD ["npm", "start"]