# install node
FROM node:16 AS build
# define the working directory of the app in the container
WORKDIR /app
# copy the package.json and package-lock.json to the working directory
COPY package*.json ./
# install the necessary dependencies
RUN npm install
# run the compatibility compiler for angular
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
# copy everything else into the app folder
COPY . .
# build the app
RUN npm run build
#build:dev For development

# get image from nginx
FROM nginx:stable
# copy the builded app into the nginx folder for serving static resources
COPY --from=build /app/dist/klockan-app/ /usr/share/nginx/html
# copy the certificates
COPY ./certificates /usr/share/nginx/certs
# copy the config file and set as default
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# expose the static resource in port 80
EXPOSE 443
EXPOSE 80
