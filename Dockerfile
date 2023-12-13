# Stage 1: Build the application
FROM node:18-alpine as builder

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

RUN npm install

# Stage 2: Run SonarQube Scanner
# Download and install SonarQube Scanner
RUN apk --no-cache add openjdk11-jre
ENV SONAR_SCANNER_VERSION 4.6.2.2472
RUN wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip && \
    unzip -a sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip && \
    rm sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip
ENV PATH="/app/sonar-scanner-$SONAR_SCANNER_VERSION-linux/bin:${PATH}"

# Analyze the code
RUN sonar-scanner \
  -Dsonar.projectKey=viajabara_frontend \
  -Dsonar.sources=.

# Stage 3: Configure and run the application
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

# Configurar la variable de entorno del puerto
ENV PORT 3030

# Exponer el puerto
EXPOSE $PORT

CMD ["npm", "start", "--", "--port", "$PORT"]
