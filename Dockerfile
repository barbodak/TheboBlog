FROM node:19 as build-vite
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Setup NGINX and copy built assets
FROM nginx:stable-alpine as production
COPY --from=build-vite /app/dist /usr/share/nginx/html
# Copy the Nginx configuration file into the container
COPY default.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
