import { Controller } from "@nestjs/common";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

import { AuthHandler } from "./auth.handler";

@Controller()
export class AuthController {
	public static authHandler: AuthHandler;

	public constructor(authHandler: AuthHandler) {
		AuthController.authHandler = authHandler;
	}

	public static signin(username: string, password: string): Promise<string> {
		return AuthController.authHandler.signin(username, password);
	}

	public static signup(
		username: string,
		password: string,
		address?: string,
		birthday?: number
	): Promise<string> {
		return AuthController.authHandler.signup(
			username,
			password,
			address,
			birthday
		);
	}

	public static update(
		_id: mongoose.Types.ObjectId,
		address?: string,
		birthday?: number
	): Promise<string> {
		return AuthController.authHandler.update(_id, address, birthday);
	}

	public static checkIdUser(id: string) {
		return AuthController.authHandler.checkIdUser(id);
	}

	public static verifyToken(token: string): JwtPayload | string {
		return AuthController.authHandler.verifyToken(token);
	}

	public static getAllUser() {
		return AuthController.authHandler.getAllUser();
	}
}
