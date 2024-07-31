# Server
FROM registry.access.redhat.com/ubi9/nodejs-18
# Static env vars
ARG VERSION
ENV VERSION $VERSION
ENV NODE_ENV production
ENV HOME_SERVER /opt/app-root/src/app/api

# Configure server
# Using root to transfer ownership of work dir
USER root
RUN mkdir -p ${HOME_SERVER}

WORKDIR ${HOME_SERVER}
COPY package*.json ./
RUN npm ci
RUN npm install -g @nestjs/cli@8.0.0
COPY . .
RUN npm run build
# Run app

RUN chown -R 1001 ${HOME_SERVER}

USER 1001
EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]