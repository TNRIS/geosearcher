# geosearcher

This example app shows the basic integration of a geocoder component built with
[downshift](https://github.com/downshift-js/downshift) into a react app with a
mapbox gl map. The geocosearcher uses the TNRIS nominatim geocoding service. The
component will also work with other mapping libraries if the map code is
adjusted for that library.

## Local Development
Your local dev environment can be setup in 2 ways. The preferred method is to
use docker compose.

### IMPORTANT First Step!
1. Make a copy of `.env.local.example` and name it `.env.local`
2. Add the app secrets to `.env.local` before starting up

### Docker Compose
Prerequisites: [Docker Engine](https://docs.docker.com/engine/) &
[Docker Compose](https://docs.docker.com/compose/)
1. From the project directory, start up the application by running
   `docker-compose up`
2. Enter http://localhost:3000/ in a browser to see the application running 

### NPM Scripts
Prerequisite: node 12
1. From the project directory, install app dependencies by running
   `npm install`
2. Start up the application by running `npm run start`
3. Enter http://localhost:3000/ in a browser to see the application running
