#!/bin/bash

# show members of swarm
docker-machine ssh manager1 "docker node ls"

# lists all machines created
docker-machine ls

# create a service and list out the services. 
# This creates a single service called web that runs the latest nginx
docker-machine ssh manager1 "docker service create -p 80:80 --name web nginx:latest"
docker-machine ssh manager1 "docker service ls"

# Now open the machine address in your browser. 

# inspect the service
docker-machine ssh manager1 "docker service inspect web"

# scale the service
docker-machine ssh manager1 "docker service scale web=15"
docker-machine ssh manager1 "docker service ls"
docker-machine ssh manager1 "docker service ps web"

# drain a particular node
docker-machine ssh manager1 "docker node update --availability drain worker1"
docker-machine ssh manager1 "docker service ps web"
docker-machine ssh manager1 "docker node ls"

# scale down the service
docker-machine ssh manager1 "docker service scale web=10"
docker-machine ssh manager1 "docker service ps web"

# bring worker1 back online and show it's new availability
docker-machine ssh manager1 "docker node update --availability active worker1"
docker-machine ssh manager1 "docker node inspect worker1 --pretty"

#  take the manager1 node, the leader, out of the Swarm
docker-machine ssh manager1 "docker swarm leave --force"
# Wait about 30 seconds just to be sure. 
# The Swarm still functions, but must select a new leader. 
# This happens automatically.
docker-machine ssh manager2 "docker node ls"

docker-machine ssh manager2 "docker service rm web"

# swarm-node-vbox-teardown.sh
# docker-machine stop $(docker-machine ls -q)
# docker-machine rm $(docker-machine ls -q)
