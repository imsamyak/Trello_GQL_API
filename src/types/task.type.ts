import { TaskPriorites } from '@/utils/constants';
import { Document, Types } from 'mongoose';

export type ITask = {
	id: string;
	title?: string | undefined;
	description?: string | undefined;
	priority?: (typeof TaskPriorites)[number];
};


export interface ITaskDocument extends Document, Omit<ITask, 'id'> {
	tasks: Types.Array<Types.ObjectId>;
	assignee: Types.ObjectId;
	createdAt: Date;
	createdBy: Types.ObjectId;
	deadline: Date;
	list: Types.ObjectId;
	board: Types.ObjectId;
}
