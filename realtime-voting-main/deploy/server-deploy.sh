#!/bin/sh
USER=root
TARGET=v.barcampsongkhla.org
echo "TARGET = ${TARGET}"

cd server
ssh ${USER}@${TARGET} "docker-compose -f ~/voting/server/docker-compose.yml down"
scp -r Dockerfile config.js docker-compose.yml index.js models package-lock.json package.json root@v.barcampsongkhla.org:~/voting/server/
ssh ${USER}@${TARGET} "docker-compose -f ~/voting/server/docker-compose.yml up -d --build"
