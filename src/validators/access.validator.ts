import { isValidObjectId } from 'mongoose';
import { z } from 'zod';
import { UserRole } from '@/utils/constants';
import type { IAccess } from '@/types/access.type';

export const AccessValidation = z
	.object({
		board: z.string().refine((id) => isValidObjectId(id)),
		user: z.string().refine((id) => isValidObjectId(id)),
		role: z.enum(UserRole),
	})
	.strict() satisfies Zod.ZodType<IAccess>;



