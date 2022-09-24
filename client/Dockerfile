FROM node:18

EXPOSE 3000
WORKDIR /app
COPY *.js .
COPY *.ts .
COPY *.json .
COPY src src
RUN --mount=type=cache,target=/root/.npm npm install && npm run build
ENTRYPOINT [ "npm", "run", "start" ]
