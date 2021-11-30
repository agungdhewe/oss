#!/bin/bash
DATABASE=fgtadb
BACKUP_DIR=$(pwd)

filename=$DATABASE-backup-$(date "+%F_%H%M")
mysqldump -u root -p --routines  $DATABASE > $BACKUP_DIR/$filename.sql





