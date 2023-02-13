#!/usr/bin/env bash
#docker build --no-cache -t doali/dev-angular:0.0.1 --build-arg UID=$(id -u) --build-arg PASSWORD=titi .
docker build -t doali/dev-angular:0.0.1 --build-arg UID=$(id -u) --build-arg PASSWORD=titi .
