import mongoose from "mongoose";

export class ConnectionMongoDb {
	private static connection: ConnectionMongoDb;

	private constructor() {}

	public static async connect(): Promise<ConnectionMongoDb> {
		if (!ConnectionMongoDb.connection) {
			ConnectionMongoDb.connection = new ConnectionMongoDb();

			return await mongoose.connect("mongodb://localhost:27017/neox");
		}

		return ConnectionMongoDb.connect;
	}
}
