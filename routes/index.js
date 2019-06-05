import Router from "koa-trie-router";
import mount from "koa-mount";
import passport from "koa-passport";
import auth from "./auth";

const router = new Router();

router.get("/", ctx => {
	ctx.body = "KOA2 Starter Kit";
});

router.get("/authed", passport.authenticate("jwt"), ctx => {
	ctx.body = "authorized";
});

// router.mount('/auth', auth);

export default app => {
	app.use(router.middleware());
	app.use(mount(auth.middleware()));
};
