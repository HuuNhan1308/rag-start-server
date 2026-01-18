# Dockerfile cho Backend (Node.js)
# Dùng cho các platform yêu cầu Docker như Railway, Render, Google Cloud Run

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (cần devDependencies để build)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Xóa devDependencies sau khi build xong (optional - giảm image size)
# RUN npm prune --production

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
