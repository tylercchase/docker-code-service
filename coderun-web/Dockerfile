FROM node:10 as node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf