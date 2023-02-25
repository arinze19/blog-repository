FROM node:16.9.1

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 6006

CMD ["npm", "start"]

