FROM node

WORKDIR /app

COPY . .

RUN npm install

RUN npm rebuild

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
