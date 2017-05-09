# DOCKER_NAME=janus-admin-jessie
FROM docker.mgm.sipwise.com/sipwise-jessie:latest

# Important! Update this no-op ENV variable when this Dockerfile
# is updated with the current date. It will force refresh of all
# of the base images and things like `apt-get update` won't be using
# old cached versions when the Dockerfile is built.
ENV REFRESHED_AT 2017-05-09

# TODO - the release-trunk-jessie is too dynamic yet, though required build deps
RUN echo "deb https://deb.sipwise.com/autobuild/ release-trunk-jessie main" >>/etc/apt/sources.list

RUN apt-get update
RUN apt-get install --assume-yes \
        curl \
        nodejs

ADD package.json /tmp/
ADD npm-shrinkwrap.json /tmp/
ADD README.md /tmp/

WORKDIR /tmp

RUN npm install /tmp

RUN echo "cd /code && ./t/testrunner" >/root/.bash_history

WORKDIR /code

################################################################################
# Instructions for usage
# ----------------------
# When you want to build the base image from scratch (jump to the next section if you don't want to build yourself!):
# NOTE: run the following commands from root folder of git repository:
# % docker build --tag="janus-admin-jessie" -f ./t/Dockerfile .
# % docker run --rm -i -t -v $(pwd):/code:ro -v /results janus-admin-jessie:latest bash
#
# Use the existing docker image:
# % docker pull docker.mgm.sipwise.com/janus-admin-jessie
# NOTE: run the following command from root folder of git repository:
# % docker run --rm -i -t -v $(pwd):/code:ro -v /results docker.mgm.sipwise.com/janus-admin-jessie:latest bash
#
# Inside docker:
#   cd /code && ./t/testrunner
################################################################################
