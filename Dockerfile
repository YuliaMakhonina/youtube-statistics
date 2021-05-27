FROM node:14.16 AS youtube-statistics
RUN mkdir /logs
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./tsconfig.build.json .

RUN npm install --only=production

COPY ./dist .

EXPOSE 3000

CMD ["node", "main"]
#CMD "nest start"
