import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import BaseController from "./BaseController";
import Users from "../models/User";

export default class AuthController extends BaseController {
	constructor() {
		super({ model: Users });
		this.validation = {
			email: { presence: true, email: true },
			password: { presence: true, length: { minimum: 6 } },
			password_confirmation: {
				presence: true,
				equality: {
					attribute: "password",
					message: "^Password must be confirmed",
				},
			},
		};
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
	}

	async register(ctx, next) {
		const body = Object.assign({}, ctx.request.body);
		try {
			await this.validate(body);
			delete body.password_confirmation;
			const user = new this.Model({ ...body });
			await user.save();
			await next();

			ctx.body = user.toJSON();
		} catch (err) {
			throw err;
		}
	}

	async login(ctx, next) {
		const body = Object.assign({}, ctx.request.body);
		try {
			const user = await this.Model.findByEmail(body.email);
			if (!user) throw Boom.notFound("User not found");
			ctx.user = user.toJSON();
			await next();
			ctx.body = {
				accessToken: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
					issuer: process.env.JWT_ISSUER,
					expiresIn: 100,
				}),
				user,
			};
		} catch (err) {
			throw err;
		}
	}

	checkUnique = async (ctx, next) => {
		const { body } = ctx.request;
		try {
			if (body.email) {
				const exists = await this.Model.findByEmail(body.email);
				if (exists) {
					throw Boom.badRequest("Email already registered.", {
						email: body.email,
					});
				}
				return next();
			}
		} catch (err) {
			throw err;
		}
	};
}
