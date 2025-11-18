# 1단계: React 앱 빌드
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# 2단계: Nginx 서버로 빌드 결과물 서빙
FROM nginx:1.25-alpine
# build 단계에서 생성된 /app/build 폴더의 내용물을
# Nginx의 기본 HTML 서빙 폴더로 복사
COPY --from=build /app/build /usr/share/nginx/html

# (선택) Nginx 포트를 80번으로 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]

