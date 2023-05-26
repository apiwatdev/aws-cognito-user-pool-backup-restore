"use strict";
const {
  CognitoIdentityProviderClient,
  ListUserPoolsCommand,
  DescribeUserPoolClientCommand,
  DescribeUserPoolCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const fs = require("fs");

async function backupUserPool() {
  const client = new CognitoIdentityProviderClient({
    region: "ap-southeast-1",
  });
  //   const input = {
  //     MaxResults: 10,
  //   };
  //   const listUserPoolsCom = new ListUserPoolsCommand(input);
  //   const resUserPools = await client.send(listUserPoolsCom);
  //   const userPools = resUserPools.UserPools;

  const inputForDescribe = {
    UserPoolId: "ap-southeast-1_PxRaR8tOO",
  };
  const describeUserPoolClientCommand = new DescribeUserPoolCommand(
    inputForDescribe
  );

  const resUserPool = await client.send(describeUserPoolClientCommand);
  const userPool = resUserPool.UserPool;
  const backupFilePath = `./backup/user-pool-${userPool.Name}.json`;

  fs.writeFileSync(backupFilePath, JSON.stringify(userPool, null, 2));

  console.log(userPool);
}

(async () => {
  await backupUserPool();
})();
