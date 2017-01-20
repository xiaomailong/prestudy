#!/bin/bash

# Create the directory needed to run the sshd daemon
mkdir /var/run/sshd 

# Add docker user and generate a random password with 12 characters that includes at least one capital letter and number.
DOCKER_PASSWORD=`pwgen -c -n -1 12`
echo User: docker Password: $DOCKER_PASSWORD
DOCKER_ENCRYPYTED_PASSWORD=`perl -e 'print crypt('"$DOCKER_PASSWORD"', "aa"),"\n"'`
useradd -m -d /home/docker -p $DOCKER_ENCRYPYTED_PASSWORD docker
sed -Ei 's/adm:x:4:/docker:x:4:docker/' /etc/group

# Set the default shell as bash for docker user.
chsh -s /bin/bash docker

# Copy the config files into the docker directory
cd /src/config/ && sudo -u docker cp -R .[a-z]* [a-z]* /home/docker/

# restarts the xdm service
/etc/init.d/xdm restart

ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
ssh-keygen -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key
ssh-keygen -t ed25519 -f /etc/ssh/ssh_host_ed25519_key

# Start the ssh service
/usr/sbin/sshd -D
