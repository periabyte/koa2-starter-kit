import Router from "koa-trie-router";
import passport from "koa-passport";
import AuthController from "../controllers/AuthController";
import verifyPassword from "../middlewares/verifyPassword";

const router = new Router();
const auth = new AuthController();
router.post("/register", auth.checkUnique, auth.register);
router.post("/login", passport.authenticate("local"), auth.login);

export default router;
