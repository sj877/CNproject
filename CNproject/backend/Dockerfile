# 1. 의존성 설치
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install

# 2. 코드 복사
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY server.js .

# 3. 서버 실행
CMD ["npm", "start"]

