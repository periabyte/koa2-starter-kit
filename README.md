# koa2-starter-kit

Built this so I always have a starting point for a rest api utilizing `async/await` and `es6+` features. Feel free to use it as it is or modify it according to your needs.

## Packages Used

-   [Koa](https://github.com/koajs/koa)
-   [koa-trie-router](https://github.com/koajs/trie-router) - Router for Koa
-   [koa-mount](https://github.com/koajs/mount) - to mount multiple koa-trie-router
-   [koa-body](https://github.com/dlau/koa-body) - Body Parser Middleware
-   [koa-compose](https://github.com/koajs/compose) - Compose Middleware
-   [koa-morgan](https://github.com/koa-modules/morgan) - HTTP request logger middleware for koa.
-   [koa-passport](https://github.com/rkusa/koa-passport) - Passport wrapper for koa
-   [passport-local](http://www.passportjs.org/packages/passport-local/) - Username/Email and Password strategy for passport
-   [passwport-jwt](http://www.passportjs.org/packages/passport-jwt/) - JWTStrategy for passport
-   [Mongoose](https://github.com/Automattic/mongoose) - MongoDB ODM
-   [Boom](https://github.com/hapijs/boom) - For errors
-   [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - bcrypt in plain javascript
-   [dotenv](https://github.com/motdotla/dotenv) - loads environment variables from .env
-   [validate.js](https://github.com/ansman/validate.js) - validator for javascript objects
-   [ESlint](https://eslint.org) - Linting library chose [Airbnb-Base](https://github.com/airbnb/javascript)
-   [Prettier](https://prettier.io) - Prettier

## Structure

Self explanatory

-   `controllers` - place for controllers used by routes here
-   `middlewares` - place for middlewares
-   `models` - place for `mongoose` models
-   `routes` - place `koa-trie-router` routes
-   `server.js` - set up server
-   `index.js` - entry point
-   `.env` - Environment Variables
-   `.eslintrc.json` - eslint config

## Changelogs

-   Replaced Camo.js with Mongoose
-   Replaced koa-66 with koa-trie-router
-   Added Passport.js
-   Updated several packages
-   Added Prettier
