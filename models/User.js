import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const schema = mongoose.Schema(
	{
		email: {
			type: "string",
			required: true,
		},
		password: {
			type: "string",
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (d, ret) => {
				ret.id = ret._id;
				delete ret.password;
				delete ret._id;
				return ret;
			},
		},
	}
);

schema.pre("save", async function hash() {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

schema.statics.findByEmail = function findByEmail(email) {
	return this.findOne({ email });
};

schema.statics.singular = function singular() {
	return "user";
};

schema.methods.verifyPassword = async function verifyPassword(password) {
	return bcrypt.compare(password, this.password);
};

export default mongoose.model("users", schema);
