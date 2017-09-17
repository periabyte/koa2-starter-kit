/* eslint-disable no-console */
import Koa from 'koa';
import morgan from 'koa-morgan';
import bodyParser from 'koa-body';
import dotenv from 'dotenv';
import errorsMiddleware from './middlewares/errors';
import database from './middlewares/database';
import routes from './routes';

dotenv.config();
const app = new Koa();

// connect(process.env.DB);
app.use(database);
app.use(morgan('tiny'));
app.use(bodyParser());
app.use(errorsMiddleware);
app.use(routes.routes());
// app.use(routes.allowedMethods());

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
