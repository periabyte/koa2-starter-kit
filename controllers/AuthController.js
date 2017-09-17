import BaseController from './BaseController';
import User from '../models/User';

export default class AuthController extends BaseController {
	constructor() {
		super({ model: User });
		this.validation = {
			email: { presence: true, email: true },
			password: { presence: true, length: { minimum: 6 } },
			password_confirmation: {
				presence: true,
				equality: {
					attribute: 'password',
					message: '^Password must be confirmed',
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
			const user = await this.Model.create({ ...body }).save();
			await next();

			ctx.body = { ...ctx.body, user: user.toEntity() };
		} catch (err) {
			throw err;
		}
	}

	async login(ctx, next) {
		const body = Object.assign({}, ctx.request.body);
		try {
			const user = await this.Model.findOne({ email: body.email });
			if (!user) throw new Error('Invalid Credentials');
			ctx.user = user;
			await next();
			ctx.body = { user: user.toEntity() };
		} catch (err) {
			throw err;
		}
	}
}
