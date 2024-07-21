FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV BACKEND_URL=http://localhost:3000

CMD ["npm", "run", "dev"]