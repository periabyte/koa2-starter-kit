import bcrypt from 'bcryptjs';
import BaseModel from './BaseModel';

export default class User extends BaseModel {
	constructor() {
		super({ singular: 'user' });
		this.email = {
			type: String,
			unique: true,
			required: true
		};
		this.password = {
			type: String,
			required: true
		};
	}

	toEntity() {
		const model = { ...this.toJSON() };
		model.id = model._id;
		delete model._id;
		delete model.password;
		return model;
	}

	preSave() {
		this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));

		return this;
	}
}
