import { isValidObjectId } from "mongoose";
import type { IUser } from "@/types/user.type";
import { isStrongPassword } from "validator";
import { z } from "zod";

export const UserValidation = z
	.object({
		id: z.string().refine((id) => isValidObjectId(id)),
		fName: z.string().trim().min(3).max(20),
		lName: z.string().trim().max(20).optional(),
		email: z.string().email(),
		password: z
			.string()
			.refine((password) => isStrongPassword(password)),
		isVerified: z.boolean().optional(),
		isActive: z.boolean().optional(),
	})
	.strict() satisfies Zod.ZodType<IUser>;
