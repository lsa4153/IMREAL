# 🎭 IMReal - 딥페이크 탐지 및 이미지 보호 애플리케이션

<div align="center">

**딥페이크로부터 당신의 이미지를 보호하고, AI가 생성한 가짜 이미지를 탐지하는 웹 애플리케이션입니다.**

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.4-646cff?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

---

## 📋 목차

- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [사용 가능한 명령어](#️-사용-가능한-명령어)
- [페이지 소개](#-페이지-소개)
- [환경 변수](#-환경-변수)
- [문제 해결](#-문제-해결)
- [라이센스](#-라이센스)

---

## ✨ 주요 기능

- 🔍 **Deepfake 탐지**: 이미지가 AI로 생성되었거나 조작되었는지 확인
- 🛡️ **이미지 보호**: AI가 학습하지 못하도록 이미지를 보호
- 💧 **워터마크 추가**: 보이지 않는 워터마크로 이미지 소유권 증명
- 📰 **딥페이크 뉴스**: 최신 딥페이크 관련 뉴스 및 정보 제공
- 📊 **탐지 기록**: 과거 분석 내역을 쉽게 확인
- 🎨 **모던 UI/UX**: Framer Motion을 활용한 부드러운 애니메이션

---

## 🛠️ 기술 스택

### Frontend
- **React 18.3.1** - 사용자 인터페이스 구축
- **React Router v6** - 클라이언트 사이드 라우팅
- **Vite** - 빠른 개발 환경 및 빌드 도구
- **TailwindCSS** - 유틸리티 기반 CSS 프레임워크
- **Framer Motion** - 부드러운 애니메이션 및 트랜지션

### State Management & Data Fetching
- **TanStack Query (React Query)** - 서버 상태 관리
- **Axios** - HTTP 클라이언트

### UI Components & Icons
- **Lucide React** - 아이콘 라이브러리
- **Class Variance Authority** - 컴포넌트 변형 관리
- **clsx & tailwind-merge** - 클래스 이름 관리

---

## 📁 프로젝트 구조

```
IMREAL/
├── src/
│   ├── api/                 # API 클라이언트 설정
│   │   └── apiClient.js
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   │   └── ui/
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       └── input.jsx
│   ├── layouts/             # 레이아웃 컴포넌트
│   │   └── Layout.jsx
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Home.jsx         # 홈 페이지
│   │   ├── Detect.jsx       # 딥페이크 탐지
│   │   ├── Protect.jsx      # 이미지 보호
│   │   ├── Watermark.jsx    # 워터마크 추가
│   │   ├── History.jsx      # 탐지 기록
│   │   └── News.jsx         # 뉴스
│   ├── utils/               # 유틸리티 함수
│   │   └── index.js
│   ├── App.jsx              # 메인 앱 컴포넌트
│   └── main.jsx             # 엔트리 포인트
├── public/                  # 정적 파일
├── .env.example             # 환경 변수 예시
├── index.html               # HTML 템플릿
├── package.json             # 프로젝트 의존성
├── vite.config.js           # Vite 설정
├── tailwind.config.js       # TailwindCSS 설정
└── README.md                # 프로젝트 문서
```

---

## 🚀 시작하기

### 사전 요구사항

프로젝트를 실행하기 전에 다음 프로그램들이 설치되어 있어야 합니다:

1. **Node.js** (v18 이상)
   - [https://nodejs.org/](https://nodejs.org/) 에서 다운로드
   - 설치 확인: 터미널에서 `node --version` 실행

2. **npm** (Node.js와 함께 설치됨)
   - 설치 확인: 터미널에서 `npm --version` 실행

3. **Visual Studio Code** (권장)
   - [https://code.visualstudio.com/](https://code.visualstudio.com/) 에서 다운로드

### VSCode에서 실행하는 방법

#### 1단계: 프로젝트 열기

1. VSCode를 실행합니다
2. `파일` → `폴더 열기` (또는 `Ctrl+K Ctrl+O`)
3. IMREAL 프로젝트 폴더를 선택합니다

#### 2단계: 터미널 열기

VSCode에서 터미널을 엽니다:
- 메뉴: `터미널` → `새 터미널`
- 단축키: `Ctrl + ~` (백틱)

#### 3단계: 의존성 패키지 설치

터미널에서 다음 명령어를 실행합니다:

```bash
npm install
```

⏱️ 이 과정은 처음 실행 시 몇 분 정도 걸릴 수 있습니다.

#### 4단계: 환경 변수 설정

API를 사용하려면 환경 변수를 설정해야 합니다:

1. `.env.example` 파일을 복사하여 `.env` 파일을 만듭니다:

```bash
cp .env.example .env
```

2. `.env` 파일을 열고 실제 API URL로 수정합니다:

```env
# API Configuration
VITE_API_URL=https://your-actual-api-url.com

# Environment
VITE_ENV=development
```

#### 5단계: 개발 서버 실행

터미널에서 다음 명령어를 실행합니다:

```bash
npm run dev
```

✅ 성공하면 다음과 같은 메시지가 나타납니다:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### 6단계: 브라우저에서 확인

자동으로 브라우저가 열리지 않으면:
- 브라우저에서 `http://localhost:5173` 을 입력합니다
- 또는 터미널에서 `Ctrl + 클릭`으로 링크를 엽니다

---

## 🛠️ 사용 가능한 명령어

```bash
# 개발 서버 실행 (hot reload 지원)
npm run dev

# 프로덕션 빌드 생성
npm run build

# 빌드된 앱 미리보기
npm run preview

# 코드 린팅 (ESLint)
npm run lint
```

---

## 📄 페이지 소개

### 🏠 Home (`/`)
- 애플리케이션의 메인 페이지
- 주요 기능들에 빠르게 접근할 수 있는 대시보드
- 실시간 시계 및 사용자 환영 메시지
- 딥페이크에 대한 간단한 설명

### 🔍 Detect (`/detect`)
- 이미지를 업로드하여 딥페이크 여부를 탐지
- AI 기반 분석 결과 제공

### 🛡️ Protect (`/protect`)
- 이미지를 AI가 학습하지 못하도록 보호
- 보호된 이미지 다운로드 기능

### 💧 Watermark (`/watermark`)
- 이미지에 보이지 않는 워터마크 추가
- 이미지 소유권 증명 및 보호

### 📰 News (`/news`)
- 딥페이크 관련 최신 뉴스 및 정보
- 딥페이크 기술 동향 확인

### 📊 History (`/history`)
- 과거 딥페이크 탐지 기록 조회
- 분석 결과 관리

---

## 🔧 환경 변수

프로젝트는 다음 환경 변수를 사용합니다:

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `VITE_API_URL` | 백엔드 API 서버 URL | `https://api.example.com` |
| `VITE_ENV` | 실행 환경 | `development` |

**참고**: Vite에서는 환경 변수가 `VITE_` 접두사로 시작해야 클라이언트 코드에서 접근 가능합니다.

---

## 🔍 문제 해결

### 1. 포트가 이미 사용 중인 경우

```bash
# 다른 포트로 실행
npm run dev -- --port 3001
```

### 2. 모듈을 찾을 수 없는 경우

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 3. 빌드 에러 발생 시

```bash
# 캐시 삭제 후 재빌드
rm -rf dist .vite
npm run build
```

### 4. ESLint 경고 무시

```bash
# 경고를 무시하고 빌드
npm run build -- --no-lint
```

---

## 📝 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 🤝 기여하기

기여를 환영합니다! 다음 단계를 따라주세요:

1. 이 저장소를 포크합니다
2. 새 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

---

<div align="center">

**Made with ❤️ for protecting against deepfakes**

</div>
