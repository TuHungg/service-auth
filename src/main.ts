import { NestFactory } from "@nestjs/core";

import { AppModule } from "./main.module";

export async function bootstrap() {
	await NestFactory.create(AppModule);
}

bootstrap();
