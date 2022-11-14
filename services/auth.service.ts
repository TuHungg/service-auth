import * as dotenv from "dotenv";
import { Service, ServiceBroker } from "moleculer";

import { signindto } from "../src/auth/dto/signin.dto";
import { signupdto } from "../src/auth/dto/signup.dto";
import { updateProfileDto } from "../src/auth/dto/updateprofile.dto";
import { bootstrap } from "../src/main";
import { AuthController } from "./../src/auth/auth.controller";

dotenv.config();

const SERVICE_NAME = "auth-service";

export default class AuthService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: process.env.SERVICE_NAME || SERVICE_NAME,

			settings: {},

			hooks: {},

			created: () => {
				// Connect NetsJS
				bootstrap();
			},

			actions: {
				getAllUser: {
					handler: this.getAllUser,
				},

				signup: {
					params: {
						username: { type: "string", optional: true },
						password: { type: "string", min: 6, optional: true },
						address: "string",
						birthday: "number",
					},
					handler: this.signup,
				},

				signin: {
					params: {
						username: { type: "string", optional: true },
						password: { type: "string", optional: true },
					},
					handler: this.signin,
				},

				updateProfile: {
					params: {
						_id: { type: "string", optional: true },
						address: { type: "string", optional: false },
						birthday: { type: "number", optional: false },
					},
					handler: this.updateProfile,
				},

				checkIdUser: {
					handler: this.getcheckIdUser,
				},

				verifyToken: {
					handler: this.verifyToken,
				},
			},

			events: {},

			methods: {},
			dependencies: ["gateway"],
		});
	}

	public async getcheckIdUser(ctx: any) {
		const { userId } = ctx.params;

		const checkId = await AuthController.checkIdUser(userId);

		return checkId;
	}

	private async signin(ctx: any) {
		const { username, password }: signindto = ctx.params;

		// await this.broker.emit("auth-service.signin", ctx.params, [
		// 	"auth-serviceTaskManagement",
		// ]);

		const signined = await AuthController.signin(username, password);

		return signined;
	}

	private async signup(ctx: any) {
		const { username, password, address, birthday }: signupdto = ctx.params;

		const created = await AuthController.signup(
			username,
			password,
			address,
			birthday
		);

		return created;
	}

	private async verifyToken(ctx: any) {
		const { token } = ctx.params;

		const verify = AuthController.verifyToken(token);

		return verify;
	}

	private async updateProfile(ctx: any) {
		const { _id, address, birthday }: updateProfileDto = ctx.params;

		const updatedUser = await AuthController.update(_id, address, birthday);

		return updatedUser;
	}

	private async getAllUser() {
		const listusers = await AuthController.getAllUser();

		return listusers;
	}
}
