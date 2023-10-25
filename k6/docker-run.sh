#!/usr/bin/env zsh

#
# This script simply executes a provided JavaScript test using
# the local environment established with the `docker-compose`.
# 
# Each execution is provided a unique tag to differentiate
# discrete test runs within the Grafana dashboard.
#

set -e

if [ $# -ne 2 ]; then
    echo "Usage: ./docker-run.sh <USE_DOCKER (true/false)>"
    exit 1
fi

SCRIPT_NAME=$1
TAG_NAME="$(basename -s .js $SCRIPT_NAME)-$(date +%s)"

USE_DOCKER=$2
if [ $USE_DOCKER = 'true' ]; then
  docker-compose run --rm -T demoqa-performance-tests --tag testid=$TAG_NAME
else
  k6 run $SCRIPT_NAME --tag testid=$TAG_NAME
fi
# for testing without tags
# docker-compose run --rm -T k6 run -<$SCRIPT_NAME 
