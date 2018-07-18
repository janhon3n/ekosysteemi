FROM node:9.11.2-jessie AS builder

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build




FROM nginx:1.15.1
COPY --from=builder /app/build /build
COPY /deployment/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80