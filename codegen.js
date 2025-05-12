"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
