# Project Brief: nublu1234.github.io

> 본 문서는 프로젝트의 범위(Scope)와 목적(Objectives), 성공 기준(Success Criteria)을 명확히 정의하여 이후 모든 산출물의 기준점이 되는 기초 문서입니다.

## 1. 프로젝트 개요
- 이름: nublu1234.github.io
- 유형: 정적 웹사이트(블로그) / Gatsby 5 기반
- 사용 테마: @lekoarts/gatsby-theme-minimal-blog
- 주요 기술: Node 18, React 18, TypeScript, Theme UI, MDX

## 2. 목적(Why)
- 기술 글/메모/프로젝트 노트 등의 공개 아카이브 구축
- 태그/카테고리를 통한 주제별 탐색 제공
- 코드 하이라이트, RSS 피드, SEO 메타 정보 제공

## 3. 범위(What)
- 콘텐츠 관리
  - Posts: content/posts/<slug>/index.mdx
  - Pages: content/pages/<slug>/index.mdx
- 테마 옵션 관리
  - gatsby-config.ts 내 @lekoarts/gatsby-theme-minimal-blog 옵션 설정
- 빌드 및 배포
  - gatsby build → public 산출
  - GitHub Pages 또는 gh-pages 액션으로 배포

## 4. 이해관계자(Stakeholders)
- 소유자/운영자: 리포지토리 소유 계정(“nublu1234”)
- 독자: 기술/데이터/개발 관련 콘텐츠를 소비하는 사용자

## 5. 성공 기준(Success Criteria)
- gatsby build 성공 및 기본 페이지/블로그/태그 라우팅 정상
- RSS 피드(rss.xml) 생성
- GitHub Pages 정상 배포 및 접근 가능
- 초기 성능(로딩/렌더링)과 가독성(타이포그래피) 목표 충족

## 6. 비범위(Out of Scope)
- 커스텀 CMS 연동(미래 연동 예정)
- 복잡한 검색/댓글 시스템

## 7. 참고
- 
