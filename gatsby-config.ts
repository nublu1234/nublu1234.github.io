import type { GatsbyConfig, PluginRef } from "gatsby"
import "dotenv/config"

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

const config: GatsbyConfig = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-minimal-blog/gatsby-config.mjs
    siteTitle: `Emo zermo`,
    siteTitleAlt: `이런저런 잡다한 이야기`,
    siteHeadline: `Emo zehmo - 이런저런 잡다한 이야기`,
    siteUrl: `https://nublu1234.github.io`,
    siteDescription: ` `,
    siteImage: `/banner.jpg`,
    siteLanguage: `ko`,
    author: `@nublu1234`,
  },
  trailingSlash: `always`,
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `https://x.com/nublu1234`,
          },
          {
            name: `Homepage`,
            url: `https://nublu1234.github.io`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },

    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.STRAPI_API_URL || `http://localhost:1337`, // Strapi API 주소
        collectionTypes: [
          // Strapi에서 생성한 Collection Type들을 여기에 배열로 나열합니다.
          // 예시: 'article', 'category' 등
          `post`, // Gatsby 블로그에서 'Post' 데이터를 가져온다면
          `author`, // 글 작성자 정보도 있다면
          // 다른 Collection Type이 있다면 여기에 추가하세요.
        ],
        singleTypes: [
          // Strapi에서 생성한 Single Type이 있다면 여기에 배열로 나열합니다.
          // 예시: 'about-page', 'global-settings' 등
          // `homepage`,
          // `global`,
        ],
        queryLimit: 100, // 한 번에 가져올 항목의 최대 개수 (기본값 100)
        // Strapi API 토큰이 필요하다면 아래를 추가합니다 (일반적으로 필요하지 않을 수 있음).
        // If your Strapi API requires authentication (e.g., in production)
        // You might need to add an API token. Ensure it's read from .env
        // token: process.env.STRAPI_API_TOKEN,
      },
    },
    // --- Strapi 연동을 위한 플러그인 추가 끝 ---

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `minimal-blog - @lekoarts/gatsby-theme-minimal-blog`,
        short_name: `minimal-blog`,
        description: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.`,
        start_url: `/`,
        background_color: `#fff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            // serialize 함수 내부:
            // 1. `query: { site, allPost }` 부분을 `query: { site, allStrapiPost }`로 변경
            // 2. `query: { allPost: IAllPost; site: { siteMetadata: ISiteMetadata } }` 부분도 `allStrapiPost`로 변경
            // 3. `allPost.nodes.map` 부분을 `allStrapiPost.nodes.map`으로 변경
            serialize: ({
              query: { site, allStrapiPost }, // <--- 변경: allPost -> allStrapiPost
            }: {
              query: { allStrapiPost: IAllPost; site: { siteMetadata: ISiteMetadata } } // <--- 변경: allPost -> allStrapiPost
            }) =>
              allStrapiPost.nodes.map((post) => { // <--- 변경: allPost -> allStrapiPost
                const url = site.siteMetadata.siteUrl + post.slug
                const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`

                return {
                  title: post.title,
                  date: post.date,
                  excerpt: post.excerpt,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": content }],
                }
              }),
            // 쿼리 문자열 부분:
            // `allPost`를 `allStrapiPost`로 변경
            // Strapi에 'content' 필드가 있다면 추가하여 RSS 피드에 포함할 수 있습니다.
            query:  `
  {
    allStrapiPost(sort: { date: DESC }) {
      nodes {
        title
        date(formatString: "MMMM D, YYYY")
        excerpt
        slug
        content
      }
    }
  }
`,
            output: `rss.xml`,
            title: `Emo zehmo - 이런저런 잡다한 이야기`,
          },
        ],
      },
    },


    // You can remove this plugin if you don't need it
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-statoscope`,
      options: {
        saveReportTo: `${__dirname}/public/.statoscope/_bundle.html`,
        saveStatsTo: `${__dirname}/public/.statoscope/_stats.json`,
        open: false,
      },
    },
  ].filter(Boolean) as Array<PluginRef>,
}

export default config

interface IPostTag {
  name: string
  slug: string
}

interface IPost {
  slug: string
  title: string
  defer: boolean
  date: string
  excerpt: string
  contentFilePath: string
  html: string
  timeToRead: number
  wordCount: number
  tags: Array<IPostTag>
  banner: any
  description: string
  canonicalUrl: string
}

interface IAllPost {
  nodes: Array<IPost>
}

interface ISiteMetadata {
  siteTitle: string
  siteTitleAlt: string
  siteHeadline: string
  siteUrl: string
  siteDescription: string
  siteImage: string
  author: string
}
