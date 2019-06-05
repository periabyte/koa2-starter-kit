/* eslint-disable no-console */
import Koa from "koa";
import morgan from "koa-morgan";
import bodyParser from "koa-body";
import dotenv from "dotenv";
import passport from "koa-passport";
import setupPassport from "./middlewares/passport";
import errorsMiddleware from "./middlewares/errors";
import database from "./middlewares/database";
import routes from "./routes";

dotenv.config();
database().then(() => {
	const app = new Koa();
	app.use(morgan("tiny"));
	app.use(bodyParser());
	app.use(errorsMiddleware);
	setupPassport();
	app.use(passport.initialize());
	routes(app);
	// app.use(routes.middleware());
	// app.use(routes.allowedMethods());

	app.listen(process.env.PORT, () =>
		console.log(`Server started on port ${process.env.PORT}`)
	);
});
