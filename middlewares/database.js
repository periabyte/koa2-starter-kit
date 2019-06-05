import { connect } from "mongoose";

export default async () => {
	try {
		const { DB_HOST: host, DB_NAME: name, DB_PORT: port } = process.env;
		if (!name) throw new Error("DB_NAME is required.");
		await connect(
			`mongodb://${host || "localhost"}:${port || "27017"}/${name}`,
			{ useNewUrlParser: true }
		);
		// eslint-disable-next-line no-console
		console.log("connected to the database:", name);
	} catch (err) {
		throw err;
	}
};
