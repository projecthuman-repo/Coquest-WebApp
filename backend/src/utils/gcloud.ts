import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import CONFIG from "../config";
import { ServerError, ServerErrorCodes } from "../graphql/ServerError";
const client = new SecretManagerServiceClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// TODO: Implement proper cache invalidation, this is just a makeshift solution
const secretsPromise = client.accessSecretVersion({
  name: `projects/base-map-workspace/secrets/${CONFIG.ACCESS_JWT_NAME}/versions/latest`,
});

export async function getSecret(secretName: string) {
  const name = `projects/base-map-workspace/secrets/${secretName}/versions/latest`;
  let [version] = await secretsPromise;
  // As of writing this comment, the only secret that was fetched across all files was ACCESS_JWT_NAME
  // This condition was written in case the function is used for fetching other secrets.
  if (secretName !== CONFIG.ACCESS_JWT_NAME) {
    [version] = await client.accessSecretVersion({ name });
  }
  const payload = version?.payload?.data?.toString();

  if (!payload) {
    throw new ServerError("There was an internal server error.", {
      code: ServerErrorCodes.INTERNAL_SERVER_ERROR,
      cause: new Error("Failed to fetch secret from GCP Secret Manager."),
    });
  }
  return payload;
}
