# A. Build react app
# Base image
FROM node:alpine3.20 as build
# Work directory inside container
WORKDIR /app
# Copy package.json
COPY package.json .
# Install dependencies
RUN npm install --force
# Copy everything from source to destination directory
COPY . .
# Build app
RUN npm run build


# B. Serve with nginx
#  Base image of nginx
FROM nginx:1.23-alpine
# Default work directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static files
RUN rm -rf *
# Copy static files from build (dist folder name) stage
COPY --from=build /app/dist .
# Expose port 80
EXPOSE 80
# Run nginx
CMD ["nginx", "-g", "daemon off;"]