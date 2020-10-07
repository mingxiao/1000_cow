FROM node:14.13.0-alpine3.12

COPY package.json .
COPY app.js .

RUN npm install

EXPOSE ${PORT}

ENTRYPOINT [ "node" ]
CMD [ "app.js" ]