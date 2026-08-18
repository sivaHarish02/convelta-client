import { useParams, Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import { ArrowLeft } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import AdSlot from '../components/AdSlot'
import { categories, getToolsByCategory, getIconEmoji } from '../data/tools'

export default function CategoryPage() {
    const { categorySlug } = useParams<{ categorySlug: string }>()

    const category = categories.find(cat => cat.slug === categorySlug)
    const categoryTools = categorySlug ? getToolsByCategory(categorySlug) : []

    if (!category) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
                <h1 className="text-xl font-bold text-dark-navy mb-3">Category not found</h1>
                <Link to="/tools" className="btn-primary text-sm">
                    Back to all tools
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SEO
                title={`${category.name} - Free Online Toolkit | Convelta`}
                description={`${category.description}. Use Convelta's free ${category.name.toLowerCase()} to convert files online instantly.`}
                canonicalUrl={`/category/${category.slug}`}
            />

            <Link
                to="/tools"
                className="inline-flex items-center gap-1.5 text-sm text-peach-orange hover:text-dark-teal transition-colors mb-5"
            >
                <ArrowLeft size={15} /> Back to all tools
            </Link>

            <h1 className="text-2xl font-bold text-dark-navy mb-1">{category.name}</h1>
            <p className="text-sm text-dark-gray mb-6">{category.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {categoryTools.map((tool) => (
                    <ToolCard
                        key={tool.id}
                        slug={tool.slug}
                        name={tool.name}
                        description={tool.description}
                        icon={getIconEmoji(tool.slug)}
                        features={tool.features}
                    />
                ))}
            </div>

            <div className="mt-8">
                <AdSlot />
            </div>
        </div>
    )
}
