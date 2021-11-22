#!/bin/bash

DATABASE=fgtadb
BACKUP_DIR=$(pwd)

unset -v latest
currentlocation=$(pwd)
cd $BACKUP_DIR
for file in "$(ls -t $DATABASE-backup-*.sql | head -1)"; do
  [[ $file -nt $latest ]] && latest=$file
done

if [[ $file == "" ]]
then
	echo "File backup $DATABASE tidak ditemukan"
	exit 0
fi	

INITCOMMAND="DROP DATABASE $DATABASE;
CREATE DATABASE $DATABASE CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE $DATABASE;
SET SESSION FOREIGN_KEY_CHECKS=0; 
"



clear
echo -e "\033[1;31m=========\033[0m"
echo -e "\033[1;31mPERHATIAN\033[0m"
echo -e "\033[1;31m=========\033[0m"
echo
echo -e "Data $DATABASE akan di restore dari"
echo -e "$BACKUP_DIR/\033[1:33m$latest\033[0m"
echo "Anda akan melakukan perintah beresiko tinggi terhadap data"
echo -e "setelah eksekusi perintah, proses ini \033[1:37mtidak bisa dibatalkan\033[0m"
read -p "Yakin [Y/N] ? " -n 1 -r

if [[ $REPLY =~ ^[Yy]$ ]]
then
    # don dangerous stuff
    echo
    echo mulai restore database ...
    result=$(mysql -u root -p --init-command="$INITCOMMAND" $DATABASE < $BACKUP_DIR/$latest 2>&1)

	if [[ $result == "" ]]
	then
		echo
		echo restore data selesai
		echo
	else
		echo
		echo -e "\033[1;31mError Saat Restore Data\033[0m"
		echo $result
		echo
	fi
  
else
	echo 
	echo restore di batalkan
	echo    

fi
