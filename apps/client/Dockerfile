# ---- Stage 1: Build the Application 🏗️ ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Stage 2: Serve the Application 🚀 ----
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/dist ./dist
USER appuser
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
