## 프로젝트 개요
본 프로젝트는 기본적인 CRUD 게시판 기능에 서버리스(Serverless) 욕설 필터링 모듈을 결합하여, 게시글 생성 시 욕설을 자동으로 감지하고 차단하는 기능을 제공하는 웹 애플리케이션입니다.

## 기술 스택
- Frontend: React
- Backend: Node.js + Express
- Database: PostgreSQL
- Serverless Module: backend/serverless/filterPost.js
- Infra: Kubernetes(k8s) 관련 구성 파일 포함

## 주요 기능
### 게시판 CRUD
- 게시글 생성(Create)
- 게시글 목록 조회(Read)
- 게시글 수정(Update)
- 게시글 삭제(Delete)

### 서버리스 기반 욕설 필터링
- 게시글 생성 시 filterPost(title, content) 함수 자동 실행
- BAD_WORDS 배열 기반 욕설 탐지
- 욕설 포함 시 게시글 차단 및 정제된 텍스트 반환
- 욕설 없음 시 정상적으로 DB 저장

## 로컬 실행 방법

### Backend 실행
```
cd backend
npm install
npm start
```
http://localhost:5000 에서 실행됩니다.

### Frontend 실행
```
cd frontend
npm install
npm start
```
http://localhost:3000 에서 실행됩니다.

주의: 로컬 환경에는 Kubernetes DB 서비스(db-service)가 없기 때문에 DB 연결 오류가 발생할 수 있습니다. 이 경우 서버리스 필터링 함수의 동작 시연 위주로 실행 가능합니다.

## 서버리스 욕설 필터링 흐름
```
사용자 입력(title, content)
        ↓
filterPost(title, content) 호출
        ↓
BAD_WORDS 배열로 욕설 탐지
        ↓
allowed = true → DB 저장
allowed = false → 차단 응답 반환
```

## 팀 구성 및 역할
| 팀원 | 역할 |
|------|------|
| 최민혁 | CRUD 게시판 기능 구현 |
| 구자중 | Kubernetes 및 모니터링 구성 |
| 한수진 | 서버리스 욕설 필터링 모듈 구현 |
