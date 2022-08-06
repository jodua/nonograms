FROM node:alpine as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn build


FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]