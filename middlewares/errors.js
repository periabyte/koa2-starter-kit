/* eslint-disable no-console */
import Boom from "@hapi/boom";

export default async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		const error = Boom.boomify(err);
		console.log("Error:", error.output.statusCode, error.message);
		const body = { message: error.message };
		if (error.data) {
			console.log("Data:", error.data);
			body.errors = error.data;
		}
		ctx.body = body;
		ctx.status = error.output.statusCode || 500;
	}
};
