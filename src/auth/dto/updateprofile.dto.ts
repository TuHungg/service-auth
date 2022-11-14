/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { mongoose } from "mongoose";

export class updateProfileDto {
	_id: mongoose.Types.ObjectId;
	address?: string;
	birthday?: number;
}
