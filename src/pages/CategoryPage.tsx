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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-2xl font-bold text-dark-navy mb-4">Category not found</h1>
                <Link to="/tools" className="btn-primary">
                    Back to all tools
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <SEO 
                title={`${category.name} - Free Online Toolkit | Convelta`}
                description={`${category.description}. Use Convelta's free ${category.name.toLowerCase()} to convert files online instantly.`}
                canonicalUrl={`/category/${category.slug}`}
            />

            <Link
                to="/tools"
                className="flex items-center gap-2 text-peach-orange hover:text-dark-teal transition-colors mb-8"
            >
                <ArrowLeft size={18} /> Back to all tools
            </Link>

            <h1 className="text-4xl font-bold text-dark-navy mb-2">{category.name}</h1>
            <p className="text-lg text-dark-gray mb-12">{category.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            <AdSlot />
        </div>
    )
}
