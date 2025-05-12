import { BadRequestError } from '@/utils/errors';
import { z, ZodError } from 'zod';

class InputValidationError extends BadRequestError {
	constructor(error: ZodError) {
		super(
			error.errors
				.map((e) => {
					const path = e.path.join('.');
					return `${path || 'field'}: ${e.message}`;
				})
				.join('; ')
		);
	}
}

export function inputValidator<T extends z.ZodTypeAny>(validationSchema: T, args: z.input<T>): z.output<T> {

	const validation = validationSchema.safeParse(args);

	if (!validation.success) {

		console.log("I am here");
		throw new InputValidationError(validation.error);
	}

	return validation.data;
}
