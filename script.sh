echo "Select Function"
read -p "Input Region (Default = "ap-southeast-1"):" region
region=${region:-ap-southeast-1}
read -p "Input UserPoolId: " user_pool_id;
read -p "Backup dir (Default: backup-app-client):" backup_dir ;
backup_dir = ${backup_dir-./backup-app-client}
npm run backup-app-client $region $user_pool_id $backup_dir