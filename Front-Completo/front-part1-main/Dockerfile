#Estágio 1: Build do App React,
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent && npm cache clean --force
COPY . .
RUN npm run build

#Estágio 2: Servir os arquivos estáticos com Nginx,
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
