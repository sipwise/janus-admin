# DOCKER_NAME=janus-admin-bullseye
FROM docker.mgm.sipwise.com/sipwise-bullseye:latest

# Important! Update this no-op ENV variable when this Dockerfile
# is updated with the current date. It will force refresh of all
# of the base images and things like `apt-get update` won't be using
# old cached versions when the Dockerfile is built.
ENV REFRESHED_AT 2021-05-03

COPY t/sources.list.d/builddeps.list /etc/apt/sources.list.d/
COPY t/sources.list.d/preferences /etc/apt/preferences.d/

RUN apt-get update && \
  apt-get install --assume-yes \
        curl \
        mocha \
        nodejs \
        npm \
        && \
  apt-get clean

ADD package.json /tmp/
ADD package-lock.json /tmp/
ADD README.md /tmp/

WORKDIR /tmp

RUN npm install /tmp

RUN echo "cd /code && ./t/testrunner" >/root/.bash_history

WORKDIR /code

################################################################################
# Instructions for usage (from root folder of git repository)
# ----------------------
# When you want to build the base image from scratch
# (jump to the next section if you don't want to build yourself!).
# The first you need to put the proper NGCP sources at t/sources.list.d/builddeps.list
# for instance, trunk:
# % echo "deb https://deb.sipwise.com/autobuild/ release-trunk-bullseye main" > t/sources.list.d/builddeps.list
# % docker build --tag="janus-admin-bullseye" -f ./t/Dockerfile .
# % docker run --rm -i -t -v $(pwd):/code:ro -v /results janus-admin-bullseye:latest bash
#
# Use the existing docker image:
# % docker pull docker.mgm.sipwise.com/janus-admin-bullseye
# NOTE: run the following command from root folder of git repository:
# % docker run --rm -i -t -v $(pwd):/code:ro -v /results docker.mgm.sipwise.com/janus-admin-bullseye:latest bash
#
# Inside docker:
#   cd /code && ./t/testrunner
################################################################################
