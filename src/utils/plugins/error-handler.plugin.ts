import { CustomAPIError } from "../errors";
import { GraphQLRequestContextDidEncounterErrors } from "@apollo/server";

export default {
	async requestDidStart() {
		return {
			async didEncounterErrors(ctx: GraphQLRequestContextDidEncounterErrors<any>) {
				ctx.errors?.forEach((err) => {
					const originalError = err.originalError;
					if (originalError instanceof CustomAPIError) {
						err.extensions.code = originalError.code;
						err.extensions.httpStatus = originalError.httpStatus;
					}
				});
			},
		};
	},
};
