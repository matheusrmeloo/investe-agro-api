FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
RUN yarn migration:run

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "dev"]