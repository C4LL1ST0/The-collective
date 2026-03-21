FROM node:22

WORKDIR /app

COPY . .

RUN npm install

RUN npm rebuild

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
