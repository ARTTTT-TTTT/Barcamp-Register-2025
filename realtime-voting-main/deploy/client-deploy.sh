#!/bin/sh
USER=root
TARGET=v.barcampsongkhla.org
CLIENT_PATH=/var/www/voting
CLIENT_DASHBOARD_PATH=/var/www/voting/dashboard

echo "TARGET = ${TARGET}"

cd front-end
yarn install
yarn winBuild
tar zcf my-app.tgz build/*
scp -r my-app.tgz ${USER}@${TARGET}:/tmp
ssh ${USER}@${TARGET} "rm -rf ${CLIENT_PATH}/*"
ssh ${USER}@${TARGET} "tar zxf /tmp/my-app.tgz --strip-components=1 -C ${CLIENT_PATH}"
ssh ${USER}@${TARGET} "mkdir ${CLIENT_DASHBOARD_PATH}/"
rm my-app.tgz
cd ..

cd show-score
yarn install
yarn winBuild
tar zcf my-app.tgz build/*
scp -r my-app.tgz ${USER}@${TARGET}:/tmp
ssh ${USER}@${TARGET} "rm -rf ${CLIENT_DASHBOARD_PATH}/*"
ssh ${USER}@${TARGET} "tar zxf /tmp/my-app.tgz --strip-components=1 -C ${CLIENT_DASHBOARD_PATH}"
rm my-app.tgz

