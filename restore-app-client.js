"use strict";
const {
  CognitoIdentityProviderClient,
  CreateUserPoolClientCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const fs = require("fs");

async function restoreUserPoolAppClient(userPoolId, region, backupDir) {
  const client = new CognitoIdentityProviderClient({
    region: region,
  });
  const backupFiles = fs.readdirSync(`${backupDir}/${userPoolId}`);

  for (const file of backupFiles) {
    if (file.startsWith("client-") && file.endsWith("-backup.json")) {
      const filePath = `${backupDir}/${userPoolId}/${file}`;
      const clientDetails = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const createClientCommand = new CreateUserPoolClientCommand({
        ...clientDetails,
        GenerateSecret: clientDetails?.ClientSecret ? true : false,
      });
      const clientApp = await client.send(createClientCommand);
      console.log(
        `App Client \u001b[1;34m'${clientApp.UserPoolClient.ClientName}'\u001b[0m restored.`
      );
    }
  }
}

(async () => {
  const args = process.argv.splice(2);
  const region = args?.[0] || "ap-southeast-1";
  const userPoolId = args?.[1] || "ap-southeast-1_cAI8YJdDU";
  const backupDir = args?.[2] || "./backup-app-client";
  await restoreUserPoolAppClient(userPoolId, region, backupDir);
})();
