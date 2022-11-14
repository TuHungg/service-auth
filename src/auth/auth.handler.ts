import { InjectModel } from "@nestjs/mongoose";
import { compare, hash } from "bcryptjs";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import mongoose from "mongoose";

import { AuthRepository } from "./auth.repository";
import { User, UserSchema } from "./schemas/users.schemas";

export class AuthHandler implements AuthRepository {
	public constructor(
		@InjectModel(User.name) private userModel: mongoose.Model<User>
	) {}

	public async getUserModel() {
		if (!this.userModel) {
			this.userModel = mongoose.model("user", UserSchema);
		}

		return this.userModel;
	}

	public async getUserbyName(username: string): Promise<User> {
		const model = await this.getUserModel();

		const user = await model.findOne({ username });

		return user;
	}

	public async signup(
		username: string,
		password: string,
		address?: string,
		birthday?: number
	): Promise<string> {
		const model = await this.getUserModel();

		const hashPassword = await hash(password, 12);

		const user = await model.create({
			username,
			password: hashPassword,
			address,
			birthday,
		});
		await user.save();

		return `Sign up ${username} successfully`;
	}

	public async signin(username: string, password: string): Promise<string> {
		const user = await this.getUserbyName(username);
		const model = await this.getUserModel();

		if (!user) {
			return `User ${username} of password invalid`;
		}

		const checkedPassword = await compare(password, user.password);

		if (!checkedPassword) {
			return "User or password invalid";
		}

		const accessToken = sign(
			{ _id: user.username, role: user.role },
			process.env.SECRET_KEY,
			{ algorithm: "HS256", expiresIn: "300s" }
		);

		// Save refresh Token
		await model.updateOne(
			{ username: user.username },
			{ refreshToken: accessToken }
		);

		return accessToken;
	}

	public async update(
		_id: mongoose.Types.ObjectId,
		address?: string,
		birthday?: number
	): Promise<string> {
		const model = await this.getUserModel();

		await model.updateOne({ _id }, { address, birthday });

		return `Update user have value { ${address} }`;
	}

	public async checkIdUser(id: string): Promise<boolean> {
		const model = await this.getUserModel();

		const checkId = await model.findById(id);

		if (!checkId) {
			return false;
		}

		return true;
	}

	public async verifyToken(token: string): Promise<JwtPayload | string> {
		const verifyToken = verify(token, process.env.SECRET_KEY);

		return verifyToken;
	}

	public async getAllUser(): Promise<User[]> {
		const model = await this.getUserModel();
		const users = await model.find();

		return users;
	}
}
