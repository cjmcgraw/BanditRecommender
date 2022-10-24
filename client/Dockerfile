FROM node:16 as builder

EXPOSE 3000
WORKDIR /app
COPY *.js *.ts *.json .npmrc .
COPY src src
RUN ls -al
RUN --mount=type=cache,target=/root/.npm npm ci
#RUN --mount=type=cache,target=root/.npm npm build

FROM builder as storybook
COPY .storybook/ .storybook/
RUN --mount=type=cache,target=/root/.npm npm run build-storybook
RUN rm -rf ./node_modules/.cache/storybook
ENTRYPOINT [ "npm", "run", "storybook:docker" ]

FROM builder as local
ENTRYPOINT [ "npm", "run", "dev" ]
