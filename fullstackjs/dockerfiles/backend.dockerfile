FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

ENV MONGODB_URL=mongodb://mongo:27017/ecommerce
ENV TOKEN_SECRET=secret
ENV REDIS_URL=redis://redis:6379

CMD ["npm", "run", "dev"]