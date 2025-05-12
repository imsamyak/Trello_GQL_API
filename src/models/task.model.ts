import { model, Schema } from 'mongoose';
import type { ITaskDocument } from '@/types/task.type';

const TaskSchema: Schema<ITaskDocument> = new Schema(
	{
		title: { type: String, minlength: 3, maxlength: 20, default: 'Untitled' },
		description: { type: String, required: true, maxlength: 50, default: '' },
		assignee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		createdAt: { type: Date, required: true, default: Date.now },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		deadline: {
			type: Date,
			required: false,
			validate: {
				validator: (date: Date) => !date || date.getTime() >= Date.now(),
				message: 'Deadline cannot be in the past.',
			},
		},
		priority: { type: String, enum: ['low', 'mid', 'high'], default: 'mid' },

		list: { type: Schema.Types.ObjectId, ref: 'List', required: true, index: true },
		board: { type: Schema.Types.ObjectId, ref: 'Board', required: true, index: true },
	},
	{ versionKey: false }
);

TaskSchema.index({ list: 1, board: 1 });

export const TaskModel = model<ITaskDocument>('Task', TaskSchema);
