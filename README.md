# MyMaps

MyMaps is a full stack web application built with Express, Bootstrap, and Knex. It allows users to create, save, and favourite personalized maps with as many points as they want.

## Final Product

!["Screenshot of homepage."](https://github.com/jonathandannel/maps/blob/master/docs/google-maps-api-1.png?raw=true)
!["Screenshot of a user's map."](https://github.com/jonathandannel/maps/blob/master/docs/google-maps-api-2.png?raw=true)
!["Screenshot 1/2 of functions that initialize maps using the Google Maps API."](https://github.com/jonathandannel/maps/blob/master/docs/homepage.png?raw=true)
!["Screenshot 2/2 of functions that initialize maps using the Google Maps API."](https://github.com/jonathandannel/maps/blob/master/docs/map.png?raw=true)
!["Screenshot of POST route for the registration page."](https://github.com/jonathandannel/maps/blob/master/docs/register-post-route.png?raw=true)

## Dependencies

-  bcrypt-nodejs
-  body-parser
-  bootstrap
-  cookie-session
-  ejs
-  express
-  jquery
-  knex
-  moment
-  node-sass-middleware
-  nodemon
-  pg
-  popper.js
-  sass

## Getting Started

- Install all dependencies (using the `npm install` command in the terminal).
- Run the development web server using the `npm start` command in the terminal. The project runs on localhost:3000.

## Known Issues
- We aimed to make the saved maps editable, but fell short of that goal in the time that we had.
- Users who are created through registration, not through seeding the database, can't log back in after they log out. At this point in time, we don't know what makes them behave differently than the seeded users.