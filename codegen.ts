import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/gql/*.gql",
  generates: {
    "src/types/gql.type.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        optionalInputFields: true,
        maybeValue: "T",
      },
    },
  },
};

export default config;
