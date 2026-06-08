import { Helmet } from 'react-helmet-async'

interface SEOProps {
    title: string
    description: string
    canonicalUrl?: string
    ogType?: 'website' | 'article'
    image?: string
}

export default function SEO({ 
    title, 
    description, 
    canonicalUrl, 
    ogType = 'website',
    image
}: SEOProps) {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://convelta-client.vercel.app'
    // Remove trailing slash if it exists to avoid double slashes
    const baseUrl = siteUrl.replace(/\/$/, '')
    const currentUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl
    const defaultOgImage = `${baseUrl}/og-image.png`
    
    // Ensure the image URL is absolute
    let ogImage = image || defaultOgImage
    if (ogImage.startsWith('/')) {
        ogImage = `${baseUrl}${ogImage}`
    }

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
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
        </Helmet>
    )
}
