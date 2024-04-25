FROM registry.access.redhat.com/ubi9/nodejs-16:1 AS builder
# Static env vars
ARG VERSION
ENV VERSION $VERSION
ENV NODE_ENV production
ENV HOME_CLIENT /opt/app-root/src/app/client

# Using root to transfer ownership of work dir
USER root
RUN mkdir -p ${HOME_CLIENT}

WORKDIR ${HOME_CLIENT}
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM registry.access.redhat.com/ubi9/nodejs-16:1 AS runner
# Static env vars
ARG VERSION
ENV VERSION $VERSION
ENV NODE_ENV production
ENV HOME_CLIENT /opt/app-root/src/app/client
# Environment variables
ENV NODE_ENV production
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Using root to transfer ownership of work dir
USER root
RUN mkdir -p ${HOME_CLIENT}

WORKDIR ${HOME_CLIENT}
COPY --from=builder ${HOME_CLIENT}/.next ./.next
COPY --from=builder ${HOME_CLIENT}/public ./public
COPY --from=builder ${HOME_CLIENT}/package.json ./package.json
COPY --from=builder ${HOME_CLIENT}/node_modules ./node_modules
COPY --from=builder ${HOME_CLIENT}/next.config.js ./next.config.js
RUN chown -R 1001 ${HOME_CLIENT}

USER 1001
EXPOSE 3000
CMD [ "npm", "run", "start" ]
