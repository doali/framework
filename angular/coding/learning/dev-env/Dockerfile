# ------------------------------------------------------------------------------
# https://bugzilla.redhat.com/show_bug.cgi?id=172231
# - dbus-launch command belongs to package dbus-x11
# ------------------------------------------------------------------------------

FROM ubuntu:latest

ARG UID
ENV UID=${UID:-1000}

ARG PASSWORD
ENV PASSWORD=${PASSWORD:-ubuntu}

LABEL maintener="doali"

RUN apt-get update && apt-get install -y \
  openssh-server \
  iproute2 \
  iputils-ping \
  socat \
  netcat \
  curl \
  sudo \
  vim \
  git \
  tree

VOLUME /volume/data
EXPOSE 22
EXPOSE 4200 # ng serve
EXPOSE 8000 # python3 -m http.server 8000

RUN useradd -rm -d /home/ubuntu -s /bin/bash -G sudo -u ${UID} ubuntu \
  && echo "ubuntu:${PASSWORD}" | chpasswd

COPY id_rsa.pub /tmp
RUN mkdir -p /home/ubuntu/.ssh \
  && mv /tmp/id_rsa.pub /home/ubuntu/.ssh/authorized_keys
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers # TODO find a better solution to run sshd...

# ------------------------------------------------------------------------------
# NPM, NVM, NodeJS
# https://github.com/nvm-sh/nvm#install--update-script
# ------------------------------------------------------------------------------
RUN cd /home/ubuntu \
  && git clone https://github.com/nvm-sh/nvm.git .nvm \
  && cd .nvm \
  && git checkout v0.39.3

RUN bash -c 'source home/ubuntu/.nvm/nvm.sh \
  && nvm install node \
  && npm install -g doctoc urchin eclint dockerfile_lint \
  && npm install --prefix "/home/ubuntu/.nvm/" \
  && npm install -g @angular/cli'

USER ubuntu

RUN echo 'export NVM_DIR="/home/ubuntu/.nvm"' >>/home/ubuntu/.bashrc \
  && echo '[ -s "${NVM_DIR}/nvm.sh" ] && \. "${NVM_DIR}/nvm.sh"  # This loads nvm' >>/home/ubuntu/.bashrc \
  && echo '[ -s "${NVM_DIR}/bash_completion" ] && \. "${NVM_DIR}/bash_completion" # This loads nvm bash_completion' >>/home/ubuntu/.bashrc

RUN mkdir -p /home/ubuntu/.local/bin
ENV PATH=${PATH}:/home/ubuntu/.local/bin
COPY --chown=${UID} script.sh /home/ubuntu/.local/bin
RUN chmod u+x /home/ubuntu/.local/bin/script.sh

WORKDIR /home/ubuntu

ENTRYPOINT ["script.sh"]
CMD ["/bin/bash"]
