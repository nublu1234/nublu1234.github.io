# System Patterns

> 시스템 아키텍처, 핵심 기술 선택, 설계 패턴, 빌드/배포 플로우를 요약합니다. 변경 시 이 문서를 우선 갱신합니다.

## 1. 아키텍처 개요
- 유형: 정적 사이트 생성(SSG)
- 프레임워크: Gatsby 5
- UI: React 18, Theme UI
- 콘텐츠: MDX 기반(Post/Page)
- 테마: @lekoarts/gatsby-theme-minimal-blog (Shadowing로 커스터마이즈)

## 2. 핵심 디렉토리/경로
- 콘텐츠
  - `content/posts/<slug>/index.mdx`
  - `content/pages/<slug>/index.mdx`
- 테마 옵션/사이트 메타
  - `gatsby-config.ts` 내 siteMetadata 및 @lekoarts/gatsby-theme-minimal-blog 옵션
- Shadowing(선택)
  - `src/@lekoarts/gatsby-theme-minimal-blog/**`
  - 예) `texts/hero.mdx`, `texts/bottom.mdx`, `components/post-footer.jsx` 등
- 기타
  - 정적 리소스: `static/` (favicon/OG 이미지/robots.txt 등)
  - 타입 설정: `tsconfig.json`

## 3. 설계 원칙
- 테마 옵션 우선, Shadowing 최소화
  - 유지보수/업그레이드 용이성 확보
- 콘텐츠/레이아웃 분리
  - MDX(콘텐츠)와 테마(표현) 구분
- 일관된 메타데이터 사용
  - siteMetadata와 frontmatter 규칙화
- 성능/가독성 우선
  - 타이포그래피 중심, 불필요한 스크립트 최소화

## 4. 데이터 흐름(고수준)
1) MDX 콘텐츠 → Gatsby GraphQL 레이어에 인덱싱
2) 테마 컴포넌트가 GraphQL로 콘텐츠 쿼리
3) 빌드 시 정적 HTML/자산 생성(`public/`)
4) 정적 호스팅(GitHub Pages)로 배포

## 5. 빌드/배포 파이프라인
- 명령어
  - 개발 서버: `yarn develop` 또는 `npm run develop`
  - 정적 빌드: `yarn build` 또는 `npm run build`
  - 정적 서브: `yarn serve` 또는 `npm run serve`
  - 캐시 정리: `yarn clean` 또는 `npm run clean`
- 산출물
  - `public/` 디렉토리
- 배포(예시)
  - GitHub Actions: gh-pages 워크플로
  - 수동 배포도 가능(정적 파일 업로드)

## 6. 의존성/버전(요약)
- Node: 18 (프로젝트 루트 `.nvmrc` = 18)
- Gatsby: ^5.14.x
- React: ^18.3.x
- 플러그인: gatsby-plugin-feed, gatsby-plugin-manifest, gatsby-plugin-sitemap, gatsby-plugin-webpack-statoscope(옵션)

## 7. 변경/확장 시 고려 사항
- Shadowing 추가 시:
  - 파일 경로/이름 정확히 일치 필요(테마 구조 참조)
  - 업데이트 시 충돌 가능 → 변경 이력(progress.md)에 기록
- 메타데이터(siteMetadata) 변경 시:
  - RSS/SEO/공유 미리보기에 영향
- 이미지/정적 리소스 교체 시:
  - 경로/파일명 규칙(소문자-하이픈) 준수

## 8. 현재 단계 메모
- 본 문서는 “메모리뱅크 초기화” 스냅샷입니다.
- 현지화(B), 템플릿 가이드(C)는 추후 진행 예정입니다.
