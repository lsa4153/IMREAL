# IMREAL - 딥페이크 감지 프론트엔드

> AI 기반 딥페이크 탐지 및 이미지 보호 웹 애플리케이션 (Frontend Only)

## 🎯 프로젝트 소개

**IMREAL**은 딥페이크 콘텐츠를 탐지하고, 이미지를 보호하는 웹 애플리케이션입니다.

## 🌟 주요 기능

### 1️⃣ 딥페이크 탐지

- 이미지 업로드 및 분석
- AI 기반 딥페이크 감지
- 신뢰도 점수 표시

### 2️⃣ 이미지 보호

- 적대적 노이즈 추가
- AI가 분석하기 어려운 패턴 생성

### 3️⃣ 워터마크 추가

- 보이지 않는 워터마크 삽입
- 이미지 저작권 보호

### 4️⃣ 분석 기록

- 과거 분석 내역 조회
- 결과 통계 확인

### 5️⃣ 뉴스 피드

- 딥페이크 관련 최신 뉴스
- 검색 기능

---

## 📁 프로젝트 구조

```
FE/
├── node_modules/           # npm 패키지 (자동 생성)
├── src/
│   ├── api/
│   │   └── apiClient.js    # API 클라이언트 & Mock API
│   ├── components/
│   │   └── ui/             # 재사용 가능한 UI 컴포넌트
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       └── input.jsx
│   ├── layouts/
│   │   └── Layout.jsx      # 공통 레이아웃
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── Detect.jsx      # 딥페이크 탐지
│   │   ├── History.jsx     # 분석 기록
│   │   ├── Home.jsx        # 홈페이지
│   │   ├── News.jsx        # 뉴스 피드
│   │   ├── Protect.jsx     # 이미지 보호
│   │   └── Watermark.jsx   # 워터마크 추가
│   ├── utils/
│   │   └── index.js        # 유틸리티 함수
│   ├── App.jsx             # 메인 앱 컴포넌트
│   ├── index.css           # 글로벌 스타일
│   └── main.jsx            # 엔트리 포인트
├── .env.example            # 환경 변수 예시
├── index.html              # HTML 템플릿
├── package.json            # 의존성 관리
├── postcss.config.js       # PostCSS 설정
├── tailwind.config.js      # Tailwind 설정
├── vite.config.js          # Vite 설정
└── README.md               # 프로젝트 문서
```

---

## 🚀 시작하기

### 📋 사전 요구사항

- **Node.js** 18.0 이상
- **npm** 또는 **yarn**

### 1️⃣ 저장소 클론

```bash
git clone <repository-url>
cd imreal-frontend
```

### 2️⃣ 의존성 설치

```bash
npm install
```

### 3️⃣ 개발 서버 실행

```bash
npm run dev
```

브라우저에서 자동으로 `http://localhost:3000` 열림

### 4️⃣ 빌드 (배포용)

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

---

## 🧪 Mock API 모드

### 현재 상태

**기본적으로 Mock API 모드가 활성화되어 있습니다.**

```javascript
// src/api/apiClient.js
const USE_MOCK_API = true; // ✅ 현재 설정
```

### Mock API 동작 방식

- ✅ **백엔드 서버 불필요** - 모든 데이터가 브라우저 내에서 생성
- ✅ **localStorage 사용** - 분석 기록, 사용자 정보 저장
- ✅ **랜덤 데이터 생성** - 딥페이크 탐지 결과 시뮬레이션
- ✅ **지연 시간 시뮬레이션** - 실제 API와 유사한 응답 시간

### 지원되는 Mock API

#### 사용자 인증

```javascript
api.users.register(data); // 회원가입
api.users.login(data); // 로그인
api.users.logout(); // 로그아웃
api.users.getProfile(); // 프로필 조회
```

#### 딥페이크 탐지

```javascript
api.detection.analyzeImage(formData); // 이미지 분석
api.detection.getRecords(); // 분석 기록 조회
api.detection.getStatistics(); // 통계 조회
```

#### 이미지 보호

```javascript
api.protection.protectImage(formData); // 이미지 보호
api.protection.addWatermark(formData); // 워터마크 추가
```

#### 뉴스

```javascript
api.news.getLatest(); // 최신 뉴스 조회
```

---

## 🔗 백엔드 연동 방법

### Django 백엔드 준비 완료 시

#### 1️⃣ 환경 변수 설정

`.env` 파일 생성:

```env
VITE_API_URL=http://127.0.0.1:8000
```

#### 2️⃣ Mock 모드 비활성화

`src/api/apiClient.js` 파일 수정:

```javascript
// 7번 라인
const USE_MOCK_API = false; // true → false로 변경
```

#### 3️⃣ 완료! 🎉

이제 모든 API 호출이 자동으로 Django 백엔드로 전환됩니다.

### Django API 엔드포인트

백엔드가 제공해야 하는 API:

```
POST   /api/users/register/        # 회원가입
POST   /api/users/login/           # 로그인
POST   /api/users/logout/          # 로그아웃
GET    /api/users/profile/         # 프로필 조회

POST   /api/detection/image/       # 이미지 분석
GET    /api/detection/records/     # 분석 기록
GET    /api/detection/statistics/  # 통계

POST   /api/protection/jobs/       # 이미지 보호/워터마크
```

---

## 📄 주요 페이지

### 🏠 Home (`/home`)

- 앱 소개 및 주요 기능 카드
- 현재 시간 표시
- 4개 주요 기능 바로가기

### 🔍 Detect (`/detect`)

- 이미지 업로드
- 딥페이크 분석 실행
- 결과 표시 (안전/딥페이크)
- 신뢰도 점수 시각화

### 🛡️ Protect (`/protect`)

- 이미지 업로드
- 적대적 노이즈 추가
- 보호된 이미지 다운로드

### 💧 Watermark (`/watermark`)

- 이미지 업로드
- 커스텀 워터마크 텍스트 입력
- 워터마크 추가된 이미지 다운로드

### 📊 History (`/history`)

- 과거 분석 기록 목록
- 결과별 필터링
- 날짜 및 신뢰도 표시

### 📰 News (`/news`)

- 딥페이크 관련 뉴스
- 검색 기능
- 카테고리별 분류

---

## 🐛 문제 해결

### 포트 충돌

```bash
# 다른 포트로 실행
npm run dev -- --port 3001
```

### 빌드 오류

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### Mock API 데이터 초기화

브라우저 개발자 도구:

```javascript
localStorage.clear();
```

---

## 📦 주요 npm 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint 실행
```

---
