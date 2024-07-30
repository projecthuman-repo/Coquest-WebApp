const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
//const path = require("path");
const client = new SecretManagerServiceClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
const cred = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

async function getSecret(secretName) {
  const name = `projects/base-map-workspace/secrets/${secretName}/versions/latest`;
  console.log('accessing some secret version of', name);
  console.log('credentials path:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
  console.log('credentials:', cred);

  const [version] = await client.accessSecretVersion({ name });

  console.log('got version');

  const payload = version.payload.data.toString("utf8");

  return payload;
}

module.exports = {
  getSecret,
};
