FROM node:boron-slim

EXPOSE 3000

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT ["npm", "run"]

CMD ["start"]
