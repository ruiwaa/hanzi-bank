# 🐼 중단어 창고

next.js 기반으로 구현한 중국어 학습 플랫폼

---

## 📌 프로젝트 소개

- **프로젝트명**: 중단어 창고
- **개발 기간**: 2026.06.15 ~ 2026.06.29
- **소개**:
  Next.js 기반으로 개발한 중국어 학습 플랫폼입니다. 시각 장애 학습자를 포함한 모든 사용자가 중국어 단어를 학습하고, 관련 예문을 직접 작성하며 학습할 수 있습니다.

---

## 🛠 Tech Stack

| 구분                   | 도입 기술                            | 도입 목적 및 기대효과                                                             |
| ---------------------- | ------------------------------------ | --------------------------------------------------------------------------------- |
| **코어기술**           | Next.js 16, TypeScript, tailwind css | 빠른 렌더링, SEO 최적화 및 안정적인 타입 관리, 네이밍컨벤션 적용 및 다크모드 대응 |
| **상태관리**           | zustand, tanstack query, Next-themes | 전역 상태 관리, 서버 상태 캐싱 및 동기화, 다크모드 및 Hydration 문제 해결         |
| **UI & 라이브러리**    | swiper, lucide-react                 | 슬라이드 UI 구현 및 개발 생산성 향상, 일관된 아이콘 제공                          |
| **유효성 검사 & 보안** | zod, react-hook-form                 | 폼 상태 관리 및 유효성 검증을 효율적으로 처리                                     |
| **백엔드 & 배포**      | supabase, vercel                     | 서버 구축 최소화 및 개발 효율 증대, 무설정 배포 및 next.js 완벽 호환              |
| **개발 환경**          | bun, eslint&prettier                 | 자체 런타임 환경을 통해 더 빠른 패키지 설치와 실행, 코드 품질 및 컨벤션 통일      |

---

# 주요 기능

- HSK 급수별 단어 조회
- 중국어 단어 검색
- 단어 상세 정보 확인
- 단어 저장 기능
- 예문 작성 및 관리
- 회원가입 / 로그인
- 마이페이지
- 다크모드 지원
- 시각 장애인을 고려한 접근성 지원

---

# 🗂️ 폴더 구조

```jsx
src
│
├─ app
│
│  ├─ layout.tsx
│
│  ├─ (main)
│  │   ├─ layout.tsx
│  │
│  │   ├─ page.tsx
│  │
│  │   ├─ components
│  │   │   ├─ HomeBanner.tsx
│  │   │   ├─ TodayWordCard.tsx
│  │   │   └─ StudyTipCard.tsx
│  │
│  │   ├─ search
│  │   │   ├─ page.tsx
│  │   │   └─ components
│  │   │       ├─ SearchFilter.tsx
│  │   │       └─ SearchResultList.tsx
│  │
│  │   ├─ hsk
│  │   │   ├─ page.tsx
│  │   │   ├─ components
│  │   │   │   ├─ HskCard.tsx
│  │   │   │   └─ HskFilter.tsx
│  │   │   │
│  │   │   └─ [level]
│  │   │       ├─ page.tsx
│  │   │       └─ components
│  │   │           └─ WordTable.tsx
│  │
│  │   ├─ words
│  │   │   └─ [id]
│  │   │       ├─ page.tsx
│  │   │       └─ components
│  │   │           ├─ WordCard.tsx
│  │   │           ├─ ExampleCard.tsx
│  │   │           └─ WordCardList.tsx
│  │
│  │   └─ mypage
│  │       ├─ page.tsx
│  │       │
│  │       ├─ components
│  │       │   ├─ ProfileCard.tsx
│  │       │   ├─ StatsCard.tsx
│  │       │   └─ MenuCard.tsx
│  │       │
│  │       ├─ myWords
│  │       │   ├─ page.tsx
│  │       │   └─ components
│  │       │       ├─ SavedWordCard.tsx
│  │       │       └─ SavedWordFilter.tsx
│  │       │
│  │       ├─ mySentences
│  │       │   ├─ page.tsx
│  │       │   └─ components
│  │       │       ├─ SentenceCard.tsx
│  │       │       └─ SentenceFilter.tsx
│  │       │
│  │       └─ settings
│  │           ├─ layout.tsx
│  │           ├─ page.tsx
│  │           │
│  │           ├─ profile
│  │           │   ├─ page.tsx
│  │           │   └─ components
│  │           │       └─ ProfileForm.tsx
│  │           │
│  │           ├─ password
│  │           │   ├─ page.tsx
│  │           │   └─ components
│  │           │       └─ PasswordForm.tsx
│  │           │
│  │           └─ withdraw
│  │               ├─ page.tsx
│  │               └─ components
│  │                   └─ WithdrawForm.tsx
│
│  └─ (auth)
│      ├─ layout.tsx
│      │
│      ├─ login
│      │   ├─ page.tsx
│      │   └─ components
│      │       └─ LoginForm.tsx
│      │
│      └─ signup
│          ├─ page.tsx
│          └─ components
│              └─ SignupForm.tsx
│
├─ components
│   └─ layout
│       ├─ Sidebar.tsx
│       ├─ BottomNavigation.tsx
│       └─ PageContainer.tsx
│
├─ fonts
│
├─ lib
│   ├─ supabase
│   ├─ api
│   ├─ fonts.ts
│   └─ utils
│
├─ services
│   ├─ hsk.service.ts
│   ├─ word.service.ts
│   ├─ auth.service.ts
│   └─ user.service.ts
│
├─ types
│   ├─ hsk.types.ts
│   ├─ word.types.ts
│   ├─ user.types.ts
│   └─ api.types.ts
│
└─ store
    └─ modal.ts
```

# 사용 방법

````jsx
#  사용 방법

# 1. 저장소 클론

```jsx
git clone https://github.com/your-repo/hanzi-bank.git
````

```jsx
# 2. 프로젝트  폴더 이동
```

cd hanzi-bank

````

# 3.  환경  변수 설정
```jsx
NEXT_PUBLIC_SUPABASE_URL="https://[여기는본인의고유알파벳].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="공개키"
````

# 4. 패키지 설치

```jsx
bun install
```

# 5. 개발 서버 실행

```jsx
bun dev
```

👉 실행 후 브라우저에서 [http://localhost:3000](http://localhost:3000/) 접속

---
