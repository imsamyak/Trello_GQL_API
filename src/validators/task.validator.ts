import { isValidObjectId } from 'mongoose';
import type { ITask } from '@/types/task.type';
import { z } from 'zod';
import { TaskPriorites } from '@/utils/constants';

export const TaskValidation = z
	.object({
		id: z.string().refine((id) => isValidObjectId(id)),
		title: z.string().trim().optional(),
		description: z.string().trim().optional(),
		priority: z.enum(TaskPriorites).optional()
	})
	.strict() satisfies Zod.ZodType<ITask>;
