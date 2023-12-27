#----CODE GENERATION----
FROM openapitools/openapi-generator-cli:v6.3.0 as openapitools
WORKDIR /sniff-react-client
COPY api-v1.yaml .
RUN bash /usr/local/bin/docker-entrypoint.sh generate -i api-v1.yaml -g typescript-axios -spaces=2

#----NPM BUILD----
FROM node:18-alpine
WORKDIR /sniff-react-app
COPY package.json .
COPY package-lock.json .
COPY .nvmrc .
RUN npm install --no-optional --ignore-scripts
COPY . .
COPY --from=openapitools /sniff-react-client ./src/client
RUN npm run build
EXPOSE 8080 80 3000
CMD ["npm", "start"]
