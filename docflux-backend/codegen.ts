
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema.graphql",
  generates: {
    "src/generated/graphql-types.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;
