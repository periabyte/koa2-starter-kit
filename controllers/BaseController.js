import validate from 'validate.js';
import Boom from 'boom';

export default class BaseController {
	constructor(options) {
		this.Model = options.model;
		this.create = this.create.bind(this);
		this.index = this.index.bind(this);
		this.read = this.read.bind(this);
		this.validate = this.validate.bind(this);
	}

	async validate(data) {
		try {
			await validate.async(data, this.validation);
		} catch (err) {
			throw Boom.badData('Validation failed.', err);
		}
	}

	async create(ctx, next) {
		const body = { ...ctx.request.body };
		try {
			await this.validate(body);
			if (this.Model) {
				ctx.body = {
					...ctx.body,
					[this.Model.singular()]: await this.Model.create(body).save(),
				};
			}
		} catch (err) {
			throw err;
		}

		if (next) await next();
	}

	async read(ctx, next) {
		const id = ctx.params.id;

		try {
			const one = await this.Model.findById(id);
			ctx.body = { ...ctx.body, [this.Model.singular()]: one.toEntity() };
			if (next) await next();
		} catch (err) {
			throw err;
		}
	}

	async index(ctx, next) {
		try {
			const all = await this.Model.find({});
			ctx.body = { ...ctx.body, [this.Model.collectionName()]: all.map(d => d.toEntity()) };
			if (next) await next();
		} catch (err) {
			throw err;
		}
	}
}
