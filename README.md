# OKESTRO 제품 요구사항 검색 챗봇

오케스트로 플랫폼 개발본부 제품 요구사항 검색을 위한 AI 챗봇 인터페이스입니다.

## 기술 스택

- **React 19.2.0** + **TypeScript**
- **Vite** - 빌드 도구
- **Tailwind CSS 4.1.17** - 스타일링
- **Motion (Framer Motion)** - 애니메이션
- **Lucide React** - 아이콘
- **React Markdown** - 마크다운 렌더링
- **Remark GFM** - GitHub Flavored Markdown 지원

## 주요 기능

- 실시간 SSE(Server-Sent Events) 스트리밍 챗봇
- 마크다운 형식 응답 렌더링 (헤딩, 리스트, 코드 블록, 테이블 등)
- 응답 타이핑 효과 (글자 단위 스트리밍)
- Glass morphism 디자인
- 애니메이션 배경 효과
- 반응형 UI

## 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경변수 설정

`.env` 파일을 생성하고 백엔드 API URL을 설정합니다:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 3. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

## API 명세

### POST `/chat`

채팅 메시지를 전송하고 SSE를 통해 스트리밍 응답을 받습니다.

**Request Body:**

```json
{
  "message": "사용자 메시지"
}
```

**Response (SSE Stream):**

```
data: {"status": "streaming", "message": "안녕하세요"}
data: {"status": "streaming", "message": "안녕하세요 좋은"}
data: {"status": "streaming", "message": "안녕하세요 좋은 하루"}
data: {"status": "completed"}
```

- `status: "streaming"`: 스트리밍 중 (message 필드에 누적된 텍스트 포함)
- `status: "completed"`: 스트리밍 완료

## 프로젝트 구조

```
src/
├── api/
│   └── chat.ts          # SSE 채팅 API 클라이언트
├── hooks/
│   └── useChat.ts       # 채팅 로직 커스텀 훅
├── assets/
│   └── logo.png         # 오케스트로 로고
├── styles/
│   └── global.css       # 전역 스타일
├── App.tsx              # 메인 컴포넌트
└── main.tsx             # 진입점
```

## 빌드

```bash
pnpm build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

## 미리보기

```bash
pnpm preview
```
