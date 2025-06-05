# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application using the script from package.json
RUN npm run build

# Stage 2: Serve the application from a light-weight setup
FROM node:20-alpine
WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/dist ./dist

# Copy package.json and package-lock.json to install only production dependencies
COPY package.json package-lock.json ./

# Install only production dependencies (which includes 'serve')
# 'serve' is used to host the static files from the 'dist' folder
RUN npm install --omit=dev

# Expose the port the app runs on (should match the port 'serve' uses)
EXPOSE 8080

# Command to run the application
# The '-s' flag for 'serve' is crucial for single-page applications (SPA)
# as it ensures that all paths are correctly routed to your index.html
CMD [ "npx", "serve", "-s", "dist", "-p", "8080" ]