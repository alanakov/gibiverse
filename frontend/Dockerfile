# Estágio de build
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV VITE_API_URL=/api/

RUN npm run build

# Estágio de produção - usar node para servir os arquivos estáticos
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
