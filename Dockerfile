# Stage 3: Configure and run the application
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

# Configurar la variable de entorno del puerto
ENV PORT 3030

# Exponer el puerto
EXPOSE $PORT

# Ejecutar SonarQube Scanner y luego iniciar la aplicación
CMD sonar-scanner -Dsonar.projectKey=viajabara_frontend -Dsonar.sources=. && npm start -- --port $PORT
