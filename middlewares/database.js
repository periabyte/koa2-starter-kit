import { connect } from 'camo';

export default async (ctx, next) => {
	try {
		await connect(process.env.DB);
		console.log('connected to database.');
		return await next();
	} catch (err) {
		throw err;
	}
};
