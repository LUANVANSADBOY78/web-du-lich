#!/bin/bash
# Backup GoTravel SQL Server Database script
# Usage: ./backup-db.sh

CONTAINER_NAME="gotravel-sqlserver"
DB_NAME="GoTravelDB"
DB_PASSWORD=${DB_PASSWORD}
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

echo "Starting database backup for $DB_NAME..."

docker exec $CONTAINER_NAME /opt/mssql-tools18/bin/sqlcmd \
  -S localhost -U sa -P "$DB_PASSWORD" -C \
  -Q "BACKUP DATABASE [$DB_NAME] TO DISK = N'/var/opt/mssql/backup_$DATE.bak' WITH NOFORMAT, NOINIT, NAME = '$DB_NAME-full', SKIP, NOREWIND, NOUNLOAD, STATS = 10"

echo "Copying backup from container..."
docker cp $CONTAINER_NAME:/var/opt/mssql/backup_$DATE.bak $BACKUP_DIR/

echo "Backup complete: $BACKUP_DIR/backup_$DATE.bak"
