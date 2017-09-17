# koa2-starter-kit
Built this so I always have a starting point for a rest api utilizing `async/await` and `es6+` features. Feel free to use it as it is or modify it according to your needs.

## Packages Used
- [Koa](https://github.com/koajs/koa)
- [Koa-66](https://github.com/menems/koa-66) - Router for Koa
- [koa-body](https://github.com/dlau/koa-body) - Body Parser Middleware
- [koa-compose](https://github.com/koajs/compose) - Compose Middleware
- [koa-morgan](https://github.com/koa-modules/morgan) - HTTP request logger middleware for koa.
- [Camo.js](https://github.com/scottwrobinson/camo) - MongoDB ODM (Class-based ES6 ODM)
- [Boom](https://github.com/hapijs/boom) - For errors
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - bcrypt in plain javascript
- [dotenv](https://github.com/motdotla/dotenv) - loads environment variables from .env
- [validate.js](https://github.com/ansman/validate.js) - validator for javascript objects
- [ESlint](https://eslint.org) - Linting library chose [Airbnb-Base](https://github.com/airbnb/javascript)

## Structure

Self explanatory
- `controllers` - place for controllers used by routes here
- `middlewares` - place for middlewares
- `models` - place for `camo.js` models
- `routes` - place `koa-66` routes
- `server.js` - set up server
- `index.js` - entry point
- `.env` - Environment Variables
- `.eslintrc.json` - eslint config
