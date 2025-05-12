import { Document } from "mongoose";

export type IUser = {
	id: string;
	fName: string;
	email: string;
	password: string;
	lName?: string | undefined;
	isActive?: boolean,
	isVerified?: boolean
};

export interface IUserDocument extends Document, Omit<IUser, 'id'> {
	
}
