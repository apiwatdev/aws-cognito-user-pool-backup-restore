"use strict";
const {
  CognitoIdentityProviderClient,
  CreateUserPoolCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const fs = require("fs");

async function backupUserPool() {
  const client = new CognitoIdentityProviderClient({
    region: "ap-southeast-1",
  });

  const backupFilePath = `./backup/user-pool-mypool.json`;

  const userPoolData = JSON.parse(fs.readFileSync(backupFilePath, "utf8"));

  const createParams = {
    PoolName: userPoolData.Name,
  };
  const createUserPoolCom = new CreateUserPoolCommand(createParams);

  //   const resUserPool = await client.send(createUserPoolCom);
//   console.log(userPoolData)
  if (userPoolData.ClientApplications) {
    for (const clientApp of userPoolData.ClientApplications) {
      console.log(clientApp);
    }
  }
  //   console.log(resUserPool);
}

(async () => {
  await backupUserPool();
})();
