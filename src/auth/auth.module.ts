import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthController } from "./auth.controller";
import { AuthHandler } from "./auth.handler";
import { User, UserSchema } from "./schemas/users.schemas";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [AuthController],
	providers: [AuthHandler],
})
export class AuthModule {}
