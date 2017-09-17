import bcrypt from 'bcryptjs';

export default async function verifyPassword(ctx, next) {
	try {
		const match = await bcrypt.compareSync(ctx.request.body.password, ctx.user.password);
		if (!match) throw new Error('Invalid Credentials.');
		await next();
	} catch (e) {
		throw e;
	}
}
