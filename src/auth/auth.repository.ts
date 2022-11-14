import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

import { User } from "./schemas/users.schemas";

export interface AuthRepository {
	signup(
		username: string,
		password: string,
		address?: string,
		birthday?: number
	): Promise<string>;

	verifyToken(token: string): JwtPayload | string;

	signin(username: string, password: string): Promise<string>;

	update(
		_id: mongoose.Types.ObjectId,
		address?: string,
		birthday?: number
	): Promise<string>;

	checkIdUser(id: string): Promise<boolean>;

	getAllUser(): Promise<User[]>;
}
