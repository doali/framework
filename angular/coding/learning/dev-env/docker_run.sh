#!/usr/bin/env bash
docker run -d -i -v $(pwd)/data:/volume/data:z -p 22000:22 -p 8000:8000 -p 4242:4200 doali/dev-angular:0.0.1
