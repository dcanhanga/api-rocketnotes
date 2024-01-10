FROM node:20.9.0

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3033

CMD ["npm", "run", "dev"]