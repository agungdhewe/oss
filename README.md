# Oss TVOne Development



*Setup & Configurasi OSS Developement
Win 7, 32bit
*

## Install NodeJS v12



## Install PouchDB ServerInstall PouchDB Server

buka commandprompt, masuk di root drive C, buat direktori bernama pouchdb
```shell
cd \
mkdir pouchdb
```


masuk ke pouchdb, buat direktori bernama data
```shell
cd \pouchdb
mkdir data
```
persiapan installasi
```shell
npm init   (isi dengan default saja)
```

install pouchdb-server
```shell
npm install pouchdb-server                 #    (sambil tunggu pouchdb seleasi bisa paralel install xampp)
```
setelah selsai, configure pouchdb-server
 edit file package.json, tambahkan pada script:
```shell
"start": "node ./node_modules/pouchdb-server/bin/pouchdb-server --dir C:/pouchdb/data --port 5984" 
```
jalankan server dengan perintah
```shell
npm start
```
# untuk menjalankan fauxton admin
http://localhost:5984/_utils/

# buat database 
ossdbfs
ossdbfsblank




## Install XAMPPInstall XAMPP

default installasi mariadb pada installasi contoh adalah versi 10.1
selanjutnya, akan upgrade ke versi 10.4
copy file dari direktori setup: UpgradeMariaDb_to_10_4 ke C:\sampp
sebelumnya stop dulu service yg jalan di xampp
setelah selesai copy, start kembali apache dan mysql

untuk test installasi buat file info.php di htdocs
``` php
<?php
phpinfo();
```


cek dengan panggil
http://localhost/info.php


setting global path environment
klik kanan   My Computer > Advanced system setting > Environtment Variables > 
pada path, tambahkan:
``` shell
;C:\xampp\php;C:\xampp\mysql\bin;
```

test dengan buka command prompt, panggil
``` shell
php -v
mysql -v
```

## Install GitInstall Git 
installer git dapat di download dari https://git-scm.com/download/win




## Setup OSS Server AppsSetup OSS Server Apps

masuk ke C:\xampp\htdocs, buat direktori bernama oss
``` shell
cd \xampp\htdocs
mkdir oss
```

masuk ke direktori oss
``` shell
cd oss
```
setup git
``` shell
git init
git remote add origin https://github.com/agungdhewe/oss.git
git pull origin main
```



## setup databasesetup database

install DBeaver, dapat di download dari https://dbeaver.io/
konek MySQL ke localhost,
username: *root*
password: *rahasia*

**Buat database**
ossdb
ossdbblank

**atau bisa juga menggunakan command line**
``` shell
mysql -u root -p

CREATE DATABASE ossdb CHARACTER SET latin1 COLLATE latin1_swedish_ci;
CREATE DATABASE ossdbblank CHARACTER SET latin1 COLLATE latin1_swedish_ci;
exit
```


restore database
``` shell
mysql -u root -p --init-command="SET SESSION FOREIGN_KEY_CHECKS=0" ossdb < C:\xampp\htdocs\oss\rootdir\backupdb\ossdb-backup-2021-11-04_1714.sql
mysql -u root -p --init-command="SET SESSION FOREIGN_KEY_CHECKS=0" ossdbblank < C:\xampp\htdocs\oss\rootdir\backupdb\ossdbblank_v4.sql
```


Untuk yang versi kosong untuk testing, bisa copy ossblank ke htdocs dengan initial login
username: *root*
password: *ossdev*








