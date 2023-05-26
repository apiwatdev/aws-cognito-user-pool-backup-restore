# Cognito User Pool Backup and Restore

## Installation
Run the following command to install the dependencies:
```bash 
npm install
```

## Usage
### Backup App Client
To backup a Cognito User Pool, use the following command:

```bash
npm run backup-app-client <region> <userPoolID>
```
Replace `<region>` with the AWS region where the user pool is located, and `<userPoolID>` with the ID of the user pool you want to back up.

The backup files will be stored in the backup-app-client directory. Each backup file will be named after the `<userPoolID>`.

### Restore App Client
To restore a Cognito User Pool from a backup, use the following command:
```bash
npm run restore-app-client <region> <userPoolID>
```
Replace `<region>` with the AWS region where you want to restore the user pool, and `<userPoolID>` with the ID of the user pool.


## Example 
### Backup App Client 
<img width="832" alt="Screenshot 2566-05-26 at 13 45 12" src="https://github.com/apiwatdev/aws-cognito-user-pool-backup-restore/assets/82103342/9b4bf1cb-341e-4037-bcbc-478b94abbcc2">

### Restore App Client
<img width="280" alt="Screenshot 2566-05-26 at 13 43 22" src="https://github.com/apiwatdev/aws-cognito-user-pool-backup-restore/assets/82103342/45447fc6-8e83-4243-9090-af363c1629ad">

<img width="1068" alt="Screenshot 2566-05-26 at 13 47 37" src="https://github.com/apiwatdev/aws-cognito-user-pool-backup-restore/assets/82103342/473cf336-bcbf-450c-bc1d-302933540e36">

