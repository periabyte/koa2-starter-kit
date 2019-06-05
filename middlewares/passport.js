import passport from "koa-passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import Boom from "@hapi/boom";
import User from "../models/User";

export default function setupPassport() {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(({ id, done }) => {
		return User.findById(id)
			.then(user => done(null, user))
			.catch(err => done(err));
	});

	passport.use(
		new LocalStrategy({ usernameField: "email" }, function(
			username,
			password,
			done
		) {
			return User.findByEmail(username)
				.then(user => {
					if (!user) {
						return done(Boom.unauthorized("Invalid Credentials"));
					}
					return user.verifyPassword(password).then(valid => {
						if (!valid) {
							return done(
								Boom.unauthorized("Invalid Credentials")
							);
						}
						return done(null, user.toJSON());
					});
				})
				.catch(err => {
					done(err);
				});
		})
	);

	passport.use(
		new JwtStrategy(
			{
				secretOrKey: process.env.JWT_SECRET,
				issuer: process.env.JWT_ISSUER,
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				passReqToCallback: true,
			},
			function(req, payload, done) {
				User.findById(payload.id)
					.then(user => {
						if (!user) {
							return done(
								Boom.unauthorized("Invalid Credentials")
							);
						}
						req.ctx.state.user = user.toJSON();
						done(null, user);
					})
					.catch(err => done(err));
			}
		)
	);
}
