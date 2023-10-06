FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

EXPOSE 3000

RUN npm install

CMD ["node", "bin/www"]

#docer build -t carapi-workshop
# docker run -p 3000:3000 carapi-workshop
