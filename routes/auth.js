import Router from 'koa-66';
import AuthController from '../controllers/AuthController';
import verifyPassword from '../middlewares/verifyPassword';

const router = new Router();
const auth = new AuthController();
router.post('/register', auth.register);
router.post('/login', auth.login, verifyPassword);

export default router;
