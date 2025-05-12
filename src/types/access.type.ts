import { UserRole } from "@/utils/constants"
import { Document, Types } from "mongoose"

export interface IAccess {
	board: string | Types.ObjectId,
	user: string | Types.ObjectId,
	role: (typeof UserRole)[number]
};

export type AccessUpdate = Pick<IAccess, "user"> & Partial<Pick<IAccess, "role">>;

export interface IAccessDocument extends IAccess, Document {
	board: Types.ObjectId,
	user: Types.ObjectId,
};