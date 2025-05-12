import { Types, Document } from 'mongoose';

export type IList = {
	id: string;
	title?: string | undefined;
	description?: string | undefined;
};

export interface IListDocument extends Document, Omit<IList, 'id'> {
	tasksCount: Number;
	order: Number;
	board: Types.ObjectId;
}
