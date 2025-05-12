import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import Error_Handler_Plugin from "./utils/plugins/error-handler.plugin";

const typeDefs = loadFilesSync(path.join(__dirname, "gql", "*.gql"));
const resolvers = loadFilesSync(
	path.join(__dirname, "resolvers", "*.resolver.ts")
);

const schema = makeExecutableSchema({
	typeDefs,
	resolvers: resolvers as any,
});

export const app = new ApolloServer({
	schema,
	plugins: [Error_Handler_Plugin],
	formatError: (formattedError) => {

		if(!formattedError.extensions?.code){
			console.log("Server Internal Error\n", formattedError);
		}

		const errorCode = formattedError.extensions?.code;
		const httpStatus = formattedError.extensions?.httpStatus || 500;

		return {
			message: formattedError.message || "Server Internal Error" ,
			extensions: {
				code: errorCode || "INTERNAL_ERROR",
				httpStatus: httpStatus,
			},
		};
	},
});
