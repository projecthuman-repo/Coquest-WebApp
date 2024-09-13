import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import CONFIG from "../config";
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

  return payload;
}
