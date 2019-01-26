#!/bin/bash

SERVER_APP_DIR='/home/ec2-user/dev/services/hanbaba/hanbaba-ui'
SERVICE_NAME='hanbaba service'

case "$1" in
start)
	printf "%-50s" "Starting $SERVICE_NAME..."
	cd ${SERVER_APP_DIR}
    sudo bash scripts/run.sh
;;
stop)
    sudo killall node
;;

restart)
  	$0 stop
  	$0 start
;;

*)
        echo "Usage: $0 {status|start|stop|restart}"
        exit 1
esac