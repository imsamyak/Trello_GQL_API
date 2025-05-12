import { isValidObjectId } from 'mongoose';
import type { IBoard } from '@/types/board.type';
import { z } from 'zod';

export const BoardValidation = z
	.object({
		id: z.string().refine((id) => isValidObjectId(id)),
		title: z.string().trim().optional(),
		description: z.string().trim().optional(),
	})
	.strict() satisfies z.ZodType<IBoard>;
