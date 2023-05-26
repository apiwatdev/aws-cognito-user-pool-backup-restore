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