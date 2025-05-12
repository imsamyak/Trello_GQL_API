import { isValidObjectId} from 'mongoose';
import type { IList } from '@/types/list.type';
import { z } from 'zod';

export const ListValidation = z
	.object({
		id: z.string().refine((id) => isValidObjectId(id)),
		title: z.string().trim().optional(),
		description: z.string().trim().optional(),
	})
	.strict() satisfies z.ZodType<IList>;
