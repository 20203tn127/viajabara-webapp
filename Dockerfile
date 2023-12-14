FROM node:18-alpine as builder

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

RUN npm install

# Configurar la variable de entorno del puerto
ENV PORT 3030

# Exponer el puerto
EXPOSE $PORT

CMD ["npm", "start", "--", "--port", "$PORT"]
