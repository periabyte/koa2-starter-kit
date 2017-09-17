import { Document } from 'camo';

export default class BaseModel extends Document {
	constructor(options) {
		super();
		this._options = options;
		// this.findById = this.findById.bind(this);
	}

	static async findById(id) {
		if (!id) throw new Error('id is undefined.');
		try {
			return await this.findOne({ _id: id });
		} catch (err) {
			throw err;
		}
	}

	/* add to constructor() argument object singular */
	static singular() {
		if (!this._options) return this.collectionName();
		return this._options.singular || this.collectionName();
	}

	static collectionName() {
		if (!this._options) return super.collectionName();
		const singularCollectionName = this._options.singularCollectionName || false;
		return singularCollectionName ? this._options.singular : super.collectionName();
	}
}
