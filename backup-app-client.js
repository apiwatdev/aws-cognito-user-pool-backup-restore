"use strict";
const {
  CognitoIdentityProviderClient,
  ListUserPoolClientsCommand,
  DescribeUserPoolClientCommand
} = require("@aws-sdk/client-cognito-identity-provider");

const fs = require("fs");

async function backupUserPool() {
  const client = new CognitoIdentityProviderClient({
    region: "ap-southeast-1",
  });

  const listUserPoolClientsCommand = new ListUserPoolClientsCommand({
    UserPoolId: "ap-southeast-1_PxRaR8tOO"
  })
  
  const listUserPoolClientsRes = await client.send(listUserPoolClientsCommand)
  const listUserPollClients = listUserPoolClientsRes.UserPoolClients

  for(const appClient of listUserPollClients){
    const describeClientParams = {
        UserPoolId: appClient.UserPoolId,
        ClientId: appClient.ClientId
      };
      console.log(describeClientParams)
      const describeUserPoolClientCommand = new DescribeUserPoolClientCommand({
        UserPoolId: appClient.UserPoolId,
        ClientId: appClient.ClientId
      })

      const describeUserPoolClientRes = await client.send(describeUserPoolClientCommand)
      const clientDetails = describeUserPoolClientRes.UserPoolClient
      const backupFilePath = `./backup-app-client/client-${clientDetails.ClientName}-backup.json`;

      fs.writeFileSync(backupFilePath, JSON.stringify(clientDetails, null, 2));

  }
}

(async () => {
  await backupUserPool();
})();
