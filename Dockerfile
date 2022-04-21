# Install dependencies only when needed
FROM node:lts AS deps

WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
# This is where because may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
FROM node:lts AS builder

WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
ARG NEXT_PUBLIC_FAIROSHOST
ENV NEXT_PUBLIC_FAIROSHOST=$NEXT_PUBLIC_FAIROSHOST
ARG NEXT_PUBLIC_FAIRDRIVEHOST
ENV NEXT_PUBLIC_FAIRDRIVEHOST=$NEXT_PUBLIC_FAIRDRIVEHOST
ARG NEXT_PUBLIC_NAME
ENV NEXT_PUBLIC_NAME=$NEXT_PUBLIC_NAME
ARG NEXT_PUBLIC_ETHERNA_INDEX_API_PATH
ENV NEXT_PUBLIC_ETHERNA_INDEX_API_PATH=$NEXT_PUBLIC_ETHERNA_INDEX_API_PATH
ARG HOST
ENV HOST=$HOST
ARG PORT
ENV PORT=$PORT

SHELL ["/bin/bash", "-eo", "pipefail", "-c"]
RUN env |grep 'NEXT\|HOST\|PORT' > .env

RUN yarn build

# Production image, copy all the files and run next
#FROM node:lts-alpine AS runner
#
#WORKDIR /opt/app
#COPY --from=builder /opt/app/next.config.js ./
#COPY --from=builder /opt/app/public ./public
#COPY --from=builder /opt/app/.next ./.next
#COPY --from=builder /opt/app/node_modules ./node_modules
#
#EXPOSE ${PORT}
#
#CMD ["node_modules/.bin/next", "start"]

FROM nginx:stable-alpine
COPY --from=builder /opt/app/out /usr/share/nginx/html
RUN echo "real_ip_header X-Forwarded-For;" \
    "real_ip_recursive on;" \
    "set_real_ip_from 0.0.0.0/0;" > /etc/nginx/conf.d/ip.conf
RUN sed -i '/index  index.html index.htm/c\        try_files $uri /index.html;' /etc/nginx/conf.d/default.conf
RUN chown -R nginx /usr/share/nginx/html
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]
