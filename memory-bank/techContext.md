# Tech Context

> 프로젝트에서 사용하는 기술 스택, 개발/실행 스크립트, 환경 제약 및 의존성을 요약합니다.

## 1. 런타임/플랫폼
- OS: Windows 11
- Node.js: 18.x (프로젝트 루트 `.nvmrc = 18`)
- 패키지 매니저: npm 또는 yarn (프로젝트 스크립트는 npm/yarn 호환)
- node는 WSL2 환경에 설치되어 있으나 터미널 환경은 cmd일 때도 있고 WSL2일 때도 있음.

## 2. 핵심 기술 스택
- Gatsby: ^5.14.x
- React: ^18.3.x
- TypeScript: ^5.x
- Theme UI
- MDX (콘텐츠 포맷)
- 테마: `@lekoarts/gatsby-theme-minimal-blog` ^6.2.x

## 3. 패키지/플러그인(요약)
- `@lekoarts/gatsby-theme-minimal-blog`: 블로그 테마
- `gatsby-plugin-feed`: RSS 피드 생성
- `gatsby-plugin-manifest`: PWA/웹앱 매니페스트
- `gatsby-plugin-sitemap`: 사이트맵 생성
- `gatsby-plugin-webpack-statoscope`(옵션): 번들 분석

## 4. 스크립트
- 개발 서버: `npm run develop` (또는 `yarn develop`)
- 빌드: `npm run build` (또는 `yarn build`)
- 정적 서브: `npm run serve` (또는 `yarn serve`)
- 캐시 정리: `npm run clean` (또는 `yarn clean`)

## 5. 타입스크립트 설정
- `tsconfig.json`
  - target: esnext
  - lib: ["dom", "esnext"]
  - jsx: react-jsx, jsxImportSource: theme-ui
  - strict: true
  - moduleResolution: node
  - include: ["./src/**/*", "./gatsby-node.ts", "./gatsby-config.ts", "./plugins/**/*"]

## 6. 구성 파일/폴더
- `gatsby-config.ts`: siteMetadata, 플러그인/테마 옵션
- `static/`: 파비콘/OG 이미지/robots.txt 등 정적 자원
- `.gitignore`: `.cache`, `public`, `node_modules` 등 제외
- `.nvmrc`: Node 18 버전 고정
- `.npmrc`: `legacy-peer-deps=true` (peer deps 충돌 완화)

## 7. 환경 제약/주의
- Gatsby 5는 최소 Node 18 권장
- Windows 환경에서 경로/권한 문제 발생 시 PowerShell/WSL 고려
- 빌드 산출물(`public/`), 캐시(`.cache/`)는 Git에서 제외됨

## 8. 알려진 워크플로(요약)
1) 콘텐츠/설정 수정
2) 로컬 개발 서버로 확인 (`develop`)
3) 정적 빌드(`build`) 후 산출물 검증
4) GitHub Pages 혹은 자동화 워크플로로 배포

## 9. 현재 단계 메모
- 본 문서는 “메모리뱅크 초기화” 기준 초안입니다.
