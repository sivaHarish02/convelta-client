import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import CategoryCard from '../components/CategoryCard'
import AdSlot from '../components/AdSlot'
import { tools, categories, getToolBySlug, getIconEmoji } from '../data/tools'

const RECENT_TOOLS_KEY = 'convelta_recent_tools'

function getRecentToolSlugs(): string[] {
    try {
        const stored = localStorage.getItem(RECENT_TOOLS_KEY)
        if (stored) {
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed)) return parsed
        }
    } catch { /* ignore */ }
    return []
}

export default function HomePage() {
    const featuredTools = tools.slice(0, 6)
    const recentSlugs = getRecentToolSlugs()
    const recentTools = recentSlugs
        .map(slug => getToolBySlug(slug))
        .filter((t): t is NonNullable<typeof t> => t !== undefined)

    return (
        <div className="w-full">
            <SEO 
                title="Convelta - Free Online Converter Toolkit | Convert Files Instantly"
                description="Convert JSON, Excel, CSV, images, and PDFs online for free. Convelta offers fast, reliable file conversion tools with no signup required."
                canonicalUrl="/"
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-deep-teal to-dark-teal py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Convelta
                        </h1>
                        <p className="text-xl text-light-aqua mb-8 max-w-2xl mx-auto">
                            Convert JSON, Excel, CSV, images, and PDFs with a clean workflow designed for speed.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link to="/tools" className="btn-primary">
                                Get Started
                            </Link>
                            <Link to="/about" className="btn-secondary">
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Recently Used Tools */}
            {recentTools.length > 0 && (
                <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-8">
                        <Clock size={22} className="text-peach-orange" />
                        <h2 className="text-2xl font-bold text-dark-navy">Recently Used</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                        {recentTools.map((tool) => (
                            <Link
                                key={tool.id}
                                to={`/tools/${tool.slug}`}
                                className="flex items-center gap-3 rounded-2xl bg-white/80 border border-soft-gray/30 px-4 py-3.5 shadow-[0_4px_12px_rgba(14,30,37,0.04)] hover:-translate-y-0.5 hover:shadow-md transition-all"
                            >
                                <span className="text-2xl shrink-0">{getIconEmoji(tool.slug)}</span>
                                <div className="min-w-0">
                                    <div className="font-semibold text-dark-navy text-sm truncate">{tool.name}</div>
                                    <div className="text-xs text-soft-gray truncate">{tool.category}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Categories Section */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-dark-navy mb-12 text-center">
                    Browse by Category
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            name={category.name}
                            slug={category.slug}
                            description={category.description}
                            toolCount={tools.filter(t => t.category === category.id).length}
                            color={category.color}
                        />
                    ))}
                </div>
            </section>

            {/* Ad Slot */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AdSlot />
            </div>

            {/* Featured Tools Section */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold text-dark-navy">
                        Popular Converters
                    </h2>
                    <Link
                        to="/tools"
                        className="flex items-center gap-2 text-peach-orange hover:text-dark-teal transition-colors"
                    >
                        View All <ArrowRight size={18} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredTools.map((tool) => (
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
            </section>

            {/* Features Section */}
            <section className="bg-white-smoke py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-dark-navy mb-12 text-center">
                        Why Choose Us?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Fast & Reliable',
                                description: 'Lightning-fast conversions without any quality loss'
                            },
                            {
                                title: 'User Friendly',
                                description: 'Simple interface that anyone can use in seconds'
                            },
                            {
                                title: 'Completely Free',
                                description: 'No signup, no credit card, no hidden charges'
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-4xl mb-4">
                                    {idx === 0 ? '⚡' : idx === 1 ? '👤' : '💰'}
                                </div>
                                <h3 className="font-bold text-lg text-dark-navy mb-2">{feature.title}</h3>
                                <p className="text-dark-gray">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
