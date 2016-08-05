# The FROM keyword tells Docker which image your image is based on.
# Whalesay is cute and has the cowsay program already, so we’ll start there.
FROM docker/whalesay:latest

# The fortunes program has a command that prints out wise sayings for our whale to say.
# So, the first step is to install it. This line installs the software into the image.
RUN apt-get -y update && apt-get install -y fortunes

# This line tells the fortune program to pass a nifty quote to the cowsay program.
CMD /usr/games/fortune -a | cowsay
