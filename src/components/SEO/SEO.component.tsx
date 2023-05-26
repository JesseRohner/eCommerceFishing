import Head from "next/head"
import { useRouter } from "next/router"

export type SEOProps = {
  url?: string
  siteName?: string

  pageTitle?: string
  description?: string
  image?: string

  canonical?: string

  createdAt?: string
  updatedAt?: string

  ogImage?: string
  ogType?: string

  twitterHandle?: string
}

const TITLE_SEPARATOR = " - "

const SEO: React.FC<RequireAtLeastOne<SEOProps, "pageTitle" | "siteName">> = ({
  url = process.env.NEXT_PUBLIC_DOMAIN_URL,
  siteName = "PF Nexus",

  pageTitle,
  description,

  canonical,

  createdAt = new Date().toISOString(),
  updatedAt = new Date().toISOString(),

  ogImage,
  ogType = "website",

  twitterHandle,
}) => {
  const { locale = "en" } = useRouter()

  const computedTitle = [pageTitle, siteName].join(TITLE_SEPARATOR)

  return (
    <Head>
      <title key="title">{computedTitle}</title>

      {description && <meta name="description" content={description} />}

      {/* Open Graph tags */}
      <meta key="og_type" property="og:type" content={ogType} />
      <meta key="og_title" property="og:title" content={pageTitle} />
      <meta
        key="og_description"
        property="og:description"
        content={description}
      />
      <meta key="og_locale" property="og:locale" content={locale} />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta key="og_url" property="og:url" content={canonical || url} />
      <meta key="og_image" property="og:image" content={ogImage} />
      <meta
        key="og_image:alt"
        property="og:image:alt"
        content={computedTitle}
      />
      <meta
        key="og_published_time"
        property="og:published_time"
        content={createdAt}
      />
      <meta
        key="og_modified_time"
        property="og:modified_time"
        content={updatedAt}
      />

      {/* Twitter tags */}
      {twitterHandle && (
        <>
          <meta
            key="twitter:card"
            name="twitter:card"
            content="summary_large_image"
          />
          <meta
            key="twitter:site"
            name="twitter:site"
            content={twitterHandle}
          />
          <meta
            key="twitter:creator"
            name="twitter:creator"
            content={twitterHandle}
          />
          <meta
            key="twitter:title"
            property="twitter:title"
            content={computedTitle}
          />
          <meta
            key="twitter:description"
            property="twitter:description"
            content={description}
          />
        </>
      )}

      <link rel="canonical" href={canonical || url} />

      {/* // TODO: Add favicon */}
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  )
}

export default SEO
