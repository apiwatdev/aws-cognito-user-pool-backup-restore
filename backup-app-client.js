"use strict";
const {
  CognitoIdentityProviderClient,
  ListUserPoolClientsCommand,
  DescribeUserPoolClientCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const fs = require("fs");

async function backupUserPoolAppClient(userPoolId, region, backupDir) {
  const client = new CognitoIdentityProviderClient({
    region: region,
  });

  const listUserPoolClientsCommand = new ListUserPoolClientsCommand({
    UserPoolId: userPoolId,
  });

  const listUserPoolClientsRes = await client.send(listUserPoolClientsCommand);
  const listUserPollClients = listUserPoolClientsRes.UserPoolClients;
  console.log("App client count:", listUserPollClients.length);
  for (const appClient of listUserPollClients) {
    let logMsg = `- App Client \u001b[1;34m"${appClient.ClientName}\u001b[0m"`;
    try {
      const describeUserPoolClientCommand = new DescribeUserPoolClientCommand({
        UserPoolId: appClient.UserPoolId,
        ClientId: appClient.ClientId,
      });

      const describeUserPoolClientRes = await client.send(
        describeUserPoolClientCommand
      );
      const clientDetails = describeUserPoolClientRes.UserPoolClient;
      const backupFilePath = `${backupDir}/client-${clientDetails.ClientName}-backup.json`;

      fs.writeFileSync(backupFilePath, JSON.stringify(clientDetails, null, 2));
      logMsg += ` backed up to: \u001b[1;34m${backupFilePath}\u001b[0m`;
      //   console.log( "\u001b[1;31m Red message" );
    } catch (error) {
      console.log(error);
    }

    console.log(logMsg);
  }
}

(async () => {
  try {
    const args = process.argv.splice(2);
  
    const region = args?.[0] || "ap-southeast-1";
    const userPoolId = args?.[1] || "ap-southeast-1_xxx";
    const backupDir = args?.[2] || "./backup-app-client";
    if (!region) {
      throw "Please input Region!";
    }
    if (!userPoolId) {
      throw "Please input UserPoolId!";
    }

    await backupUserPoolAppClient(userPoolId, region, backupDir);
  } catch (error) {
    console.log(`\u001b[1:31m;${error}\u001b[0m`);
  }
})();
