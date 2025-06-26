FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
# Use npm ci for clean installs and omit dev dependencies where possible (if not needed for build itself)
# For 'nx build', dev dependencies are typically needed, so 'npm install' is usually safer here.
RUN npm install

# Copy the entire project (Nx monorepo)
COPY . .

# Set NODE_ENV for the build process (helpful for NestJS production builds)
ENV NODE_ENV=production
# Build the NestJS backend application using Nx via npm script
# This ensures consistency with your package.json scripts.
# Added '&& ls -la dist/apps/backend' for debugging to verify output
RUN ./node_modules/.bin/nx build backend && ls -R dist

# Stage 2: Run the production application
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy only production dependencies and built application from the builder stage
# This step relies on the previous build step correctly placing files in dist/apps/backend
COPY --from=builder /usr/src/app/dist/backend ./dist/backend
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/package-lock.json ./package-lock.json

# Expose the port your NestJS application listens on (default is 3000)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/backend/main.js"]
