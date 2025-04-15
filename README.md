## 목차
[1. 프로젝트 소개](#Plake) <br/>
[2. 팀 구성](#팀-구성)  <br/>
[3. 기술 스택](#기술-스택)  <br/>
[4. 프로젝트 구조](#프로젝트-구조)  <br/>
[5. 주요 기능](#주요-기능)  <br/>
[6. 테스트 커버리지](#테스트-커버리지)  <br/>
[7. 성능 최적화](#성능-최적화)  <br/>

<br />

##  🏃 PLAKE
**Play + Brake = PLAKE**  

**반복되는 일상 속, 잠시 멈추고 즐기는 시간을 위해**
다양한 사람들이 다양한 취미 모임을 **개설, 참여, 공유**하며 일상 속 즐거움을 발견할 수 있는 웹 서비스입니다.

> **📆 프로젝트 기간:** 2025.02.28 ~ 2025.04/15 (5주)  <br />
> **🔗 배포 링크:** [https://plake.site](https://plake.site)

<br />

## 👥 팀 구성

| 이름 | 역할 |
|------|------|
| **윤하연** | 팀장 / 마이페이지 / CI-CD  |
| **김은비** | 메인 페이지 / 모임 상세 페이지 |
| **김태훈** | 로그인 / 회원가입 / 모든 리뷰 페이지 |
| **최민지** | 모임 목록 페이지 / 찜한 목록 페이지 |

<br />

## 🛠 기술 스택

| 구분           | 기술                                |
| ------------ | --------------------------------- |
| **프레임워크**    | Next.js 14 (App Router)           |
| **언어**       | TypeScript                        |
| **상태 관리**    | React Query (서버), Zustand (클라이언트) |
| **스타일링**     | Tailwind CSS, clsx                |
| **디자인 시스템**  | Storybook                         |
| **폼 관리**         | react-hook-form, zod              |
| **코드 품질 관리** | ESLint, Prettier, Husky           |
| **테스트**      | Jest, React Testing Library       |
| **배포**       | Vercel                            |
| **CI/CD**    | GitHub Actions                    |
| **모니터링**     | Sentry                            |
| **협업 툴**     | Jira                              |

<br />

## ⚙️ 프로젝트 구조

```bash
.github                          # GitHub Actions를 통한 CI/CD 자동화 설정
└── workflows/ 
    └── pr-automation.yml        # PR 생성 시 자동 라벨링, assign 등 자동화 워크플로우 
    └── pr-quailty-checks.yml    # PR 품질 체크 (예: lint, test, build 등)
.husky/                          # Husky 훅 설정
└── pre-commit                   # 커밋 전 실행되는 스크립트 (예: lint-staged)
.storybook                       # Storybook 설정 디렉토리 (컴포넌트 문서화 및 시각화)
coverage                         # 테스트 커버리지 리포트가 생성되는 디렉토리
public/             
└── images/                      # 정적 이미지 파일
└── animations/                  # Lottie 등 애니메이션 파일
.eslintrc.json                   # ESLint 설정 파일 (코드 스타일, 문법 체크)
.prettierrc                      # Prettier 설정 파일 (코드 포맷팅)
jest.config.ts                   # Jest 테스트 설정 파일
jest.setup.ts                    # 테스트 전 필요한 설정을 초기화하는 파일
sentry.edge.config.ts            # Sentry 엣지 환경용 설정 파일
sentry.server.config.ts          # Sentry 서버 환경용 설정 파일
src/
├── actions/                     # 서버 액션 디렉토리 (예: 로그인, 회원가입 등 서버 관련 로직)
├── app/                         # App Router 기반 페이지
│   ├── (home)/                  # 메인 페이지
│   ├── all-reviews/             # 모든 리뷰 페이지
│   ├── favorites/               # 찜한 모임 페이지
│   ├── login/                   # 로그인페이지
│   ├──  join/                   # 회원가입 페이지
│   ├── mypage/                  # 마이페이지
│   └── gathering/      
│       └── [tab]/               # 모임 탭별 목록 페이지
│       └── detail/              # 모임 상세 페이지
│   ├── layout.tsx               # 전체 앱 공통 레이아웃 컴포넌트
│   ├── global-error.tsx         # 전역 에러 처리용 UI
│   ├── loading.tsx              # 전역 로딩 UI
│   └── global.css               # 전역 스타일 정의
├── components/
│   ├── common/                  # 공통 컴포넌트
│   ├── layout/                  # 레이아웃 관련 컴포넌트
│   ├── skeletons/               # Suspense fallback 및 로딩 상태 스켈레톤 컴포넌트
│   ├── ui/                      # UI 컴포넌트
│   └── boundary
│       └── FetchBoundary.tsx    # Suspense 및 ErrorBoundary를 포함한 비동기 처리 컴포넌트
├── hooks/                       # 커스텀 훅
├── utils/                       # 유틸리티 함수
│   └── test-utils/              # 테스트에 필요한 유틸 함수 및 mock 정의
├── types/                       # 글로벌 타입 정의
├── constants/                   # 상수 정의
├── schemas/                     # Zod 기반 스키마 정의 (유효성 검사용)
├── stores/                      # Zustand 스토어
└── assets/                      # 빌드 타임에 필요한 이미지, 폰트 등 정적 에셋

```

<br />


## ✨ 주요 기능

### 로그인 / 회원가입
- 이메일, 비밀번호, 이름, 회사명을 기반으로 계정 생성
- 로그인 및 회원가입 시 유효성 검사 수행 (입력 지연, 포커스 이동, 버튼 클릭 시점)
- 입력 조건 미충족 시 , 에러 메시지로 피드백 제공

### GNB
- 모임 목록, 찜한 모임, 마이페이지, 로그아웃 등의 주요 기능 접근
- 사용자가 찜한 모임 수가 실시간으로 표시됨

### 메인 페이지
- 메인 배너에 애니메이션 적용, 클릭 시 해당 토픽 목록 페이지로 이동
- 현재 인기 모임, 곧 시작할 모임을 캐러셀로 확인 가능
- viewport 진입 기준으로 콘텐츠가 순차적으로 로드됨

### 모임 목록 페이지
- 지역, 날짜, 참여 인원 기준 정렬 및 필터 기능 제공
- SSR로 초기 10개 로딩 후, 클라이언트 사이드에서 무한 스크롤 적용
- 비로그인 유저도 Web Storage를 통해 찜 기능 사용 가능

### 모임 상세 페이지
- 모임 제목, 일정, 위치, 참여 유저, 개설 여부, 리뷰 정보 등 상세 정보 제공
- 참여자 수 5명 이상일 경우 자동 개설 확정
- 참여자 목록에 Hover 애니메이션 적용, 인원 초과 시 +N 형식으로 표시
- 주최자는 모임 공유 및 취소, 주최자 외 유저는 참여 및 참여 취소 가능
- 리뷰는 SSR로 초기 로드 + 클라이언트 페이지네이션으로 추가 로딩

### 찜한 모임 페이지
- 로그인 유저 및 비로그인 유저의 찜 목록 확인
- 모임에 대한 찜/찜 해제 기능 제공

### 모든 리뷰 페이지 
- 모임 종류별 필터를 통해 다른 유저의 리뷰 확인 가능
- 전체 평균 평점 및 평점 분포 확인 가능
- SSR로 초기 10개 리뷰 로드, 이후 무한 스크롤을 통해 추가 로딩

### 마이페이지
- 프로필 정보(이름, 이메일 등) 확인 및 수정
- 수정 시 모달을 통해 정보 업데이트 가능
- 내가 참여한 모임 목록 확인 및 참여한 모임에 대한 리뷰 작성 가능
- 작성 가능한 리뷰 목록과, 내가 작성한 리뷰 목록 확인 가능

<br />

## 🧪 테스트 커버리지

- ✅ **목표**: 전체 기준 60%
- ✅ **결과**: 전체 70%, **비즈니스 로직 기준 93%** 달성

<img width="984" alt="스크린샷 2025-04-15 오전 9 04 33" src="https://github.com/user-attachments/assets/82831a3d-d885-4aad-8c88-f2e5a8943baa" />



<br />


## 🚀 성능 최적화

- ✅ 이미지 최적화 
	- next/image 및 AVIF/Webp 포맷 활용
- ✅ 번들 최적화 
	- dynamic import를 사용한 코드 스플리팅
	- 경량 라이브러리로 대체
	-  초기 번들 크기 147KB -> 87.9KB로 감소
- ✅ 렌더링 최적화
	- React Profiler로 병목 구간 확인 및 개선
	- React.memo, useMemo를 통한 불필요한 렌더링 최소화
- ✅ 접근성 고려
	- aria-label, role 등을 사용한 웹 접근성 개선

