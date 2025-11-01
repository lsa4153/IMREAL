# IMReal - 딥페이크 탐지 및 이미지 보호 애플리케이션

딥페이크로부터 당신의 이미지를 보호하고, AI가 생성한 가짜 이미지를 탐지하는 웹 애플리케이션입니다.

## 📋 주요 기능

- 🔍 **Deepfake 탐지**: 이미지가 AI로 생성되었거나 조작되었는지 확인
- 🛡️ **이미지 보호**: AI가 학습하지 못하도록 이미지 보호
- 💧 **워터마크 추가**: 보이지 않는 워터마크로 이미지 소유권 증명
- 📰 **딥페이크 뉴스**: 최신 딥페이크 관련 뉴스 및 정보
- 📊 **탐지 기록**: 과거 분석 내역 확인

## 🚀 시작하기

### 사전 요구사항

VSCode에서 실행하기 전에 다음 프로그램들이 설치되어 있어야 합니다:

1. **Node.js** (v18 이상)

   - [https://nodejs.org/](https://nodejs.org/) 에서 다운로드
   - 설치 확인: 터미널에서 `node --version` 실행

2. **npm** (Node.js와 함께 설치됨)

   - 설치 확인: 터미널에서 `npm --version` 실행

3. **Visual Studio Code**
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

#### 4단계: 환경 변수 설정 (선택사항)

API를 사용하려면 환경 변수를 설정해야 합니다:

1. `.env.example` 파일을 복사하여 `.env` 파일을 만듭니다:

```bash
cp .env.example .env
```

2. `.env` 파일을 열고 실제 API URL로 수정합니다:

```
VITE_API_URL=https://your-actual-api-url.com
```

#### 5단계: 개발 서버 실행

터미널에서 다음 명령어를 실행합니다:

```bash
npm run dev
```

✅ 성공하면 다음과 같은 메시지가 나타납니다:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### 6단계: 브라우저에서 확인

자동으로 브라우저가 열리지 않으면:

- 브라우저에서 `http://localhost:3000` 을 입력합니다
- 또는 터미널에서 `Ctrl + 클릭`으로 링크를 엽니다

## 🛠️ 사용 가능한 명령어

```bash
# 개발 서버 실행 (hot reload 지원)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 앱 미리보기
npm run preview

# 코드 린팅
npm run lint
```
