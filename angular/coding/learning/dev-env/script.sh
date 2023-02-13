#!/usr/bin/env bash

# SSH daemon
sudo service ssh start

# Copy github
cd ${HOME}
mkdir -p git-github && cd git-github && git clone https://github.com/doali/github.git && cd github && bash repo-pull-clone.sh
cd -

exec "$@"
