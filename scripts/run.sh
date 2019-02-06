#!/usr/bin/env bash
SERVER_PATH=/home/ec2-user/dev/services/hanbaba/hanbaba-ui

cd ${SERVER_PATH}
npm install
npm build
pm2 stop index
pm2 start index.js