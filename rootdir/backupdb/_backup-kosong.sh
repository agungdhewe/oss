#!/bin/bash
DATABASE=ossdb
BACKUP_DIR=$(pwd)

filename=$DATABASE-backup-$(date "+%F_%H%M")
mysqldump -u root -p --routines --no-data $DATABASE > $BACKUP_DIR/$filename.sql

