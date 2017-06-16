FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Use defaults or ENV file
RUN npm install

RUN REACT_APP_API=http://efktrapi.dallago.us npm run build

RUN npm install -g serve

EXPOSE 3000

CMD [ "npm", "run", "serve" ]