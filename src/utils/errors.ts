import { GraphQLError } from "graphql";

export abstract class CustomAPIError extends GraphQLError {
	constructor(message: string) {
		super(message);
	}
	abstract httpStatus: number;
	abstract code: string;
}

export class BadRequestError extends CustomAPIError {
	override code = "BAD_REQUEST";
	override httpStatus = 400;
	constructor(message: string) {
		super(message);
	}
}

export class NotFoundError extends CustomAPIError {
	override code = `NOT_FOUND`;
	override httpStatus = 404;
	constructor(message: string) {
		super(message);
	}
}
