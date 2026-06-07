import { Helmet } from 'react-helmet-async'

interface SEOProps {
    title: string
    description: string
    canonicalUrl?: string
    ogType?: 'website' | 'article'
}

export default function SEO({ 
    title, 
    description, 
    canonicalUrl, 
    ogType = 'website' 
}: SEOProps) {
    const siteUrl = 'https://convelta.com'
    const currentUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content="Convelta" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    )
}
