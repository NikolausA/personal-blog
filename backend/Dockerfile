FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Настройка NPM для улучшения сетевой устойчивости
RUN npm config set fetch-timeout 60000
RUN npm config set fetch-retries 5
RUN npm cache clean --force

RUN npm install -g npm@latest

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
