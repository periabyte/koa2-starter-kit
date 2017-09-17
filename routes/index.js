import Router from 'koa-66';
import auth from './auth';

const router = new Router();

router.get('/', (ctx) => {
	ctx.body = 'KOA2 Starter Kit';
});

router.mount('/auth', auth);

export default router;
