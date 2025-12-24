FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies 
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Run with tsx 
CMD ["npx", "tsx", "src/server.ts"]
