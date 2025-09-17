FROM node:22.16.0-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
# COPY .env .env
RUN npm install
# RUN npm install --only-production
EXPOSE 8080
CMD ["npm", "start"]

# docker run --env-file .env -p 8080:8080 --name server-mock server-mock-95435

# <username>/nombreImg:version
