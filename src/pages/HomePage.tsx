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
    const featuredTools = tools.slice(0, 8)
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
            <section className="bg-gradient-to-br from-deep-teal to-dark-teal py-10 md:py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                            Convelta
                        </h1>
                        <p className="text-base text-light-aqua mb-6 max-w-xl mx-auto">
                            Convert JSON, Excel, CSV, images, and PDFs with a clean workflow designed for speed.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <Link to="/tools" className="btn-primary text-sm">
                                Get Started
                            </Link>
                            <Link to="/about" className="btn-secondary text-sm">
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Recently Used Tools */}
            {recentTools.length > 0 && (
                <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock size={16} className="text-peach-orange" />
                        <h2 className="text-base font-bold text-dark-navy">Recently Used</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                        {recentTools.map((tool) => (
                            <Link
                                key={tool.id}
                                to={`/tools/${tool.slug}`}
                                className="flex items-center gap-2.5 rounded-xl bg-white/80 border border-soft-gray/30 px-3 py-2.5 shadow-[0_2px_8px_rgba(14,30,37,0.04)] hover:-translate-y-0.5 hover:shadow-md transition-all"
                            >
                                <span className="text-xl shrink-0">{getIconEmoji(tool.slug)}</span>
                                <div className="min-w-0">
                                    <div className="font-semibold text-dark-navy text-xs truncate">{tool.name}</div>
                                    <div className="text-[10px] text-soft-gray truncate capitalize">{tool.category}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Categories Section */}
            <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-bold text-dark-navy mb-4">
                    Browse by Category
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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
            <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-dark-navy">
                        Popular Converters
                    </h2>
                    <Link
                        to="/tools"
                        className="flex items-center gap-1.5 text-sm text-peach-orange hover:text-dark-teal transition-colors"
                    >
                        View All <ArrowRight size={15} />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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

            {/* Why Us Section */}
            <section className="bg-white-smoke py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-dark-navy mb-6 text-center">
                        Why Choose Convelta?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            {
                                emoji: '⚡',
                                title: 'Fast & Reliable',
                                description: 'Lightning-fast conversions without any quality loss'
                            },
                            {
                                emoji: '👤',
                                title: 'User Friendly',
                                description: 'Simple interface that anyone can use in seconds'
                            },
                            {
                                emoji: '💰',
                                title: 'Completely Free',
                                description: 'No signup, no credit card, no hidden charges'
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="text-center bg-white/60 rounded-2xl p-5 border border-soft-gray/20">
                                <div className="text-3xl mb-2">{feature.emoji}</div>
                                <h3 className="font-bold text-sm text-dark-navy mb-1">{feature.title}</h3>
                                <p className="text-xs text-dark-gray leading-5">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Ad Slot */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                <AdSlot />
            </div>
        </div>
    )
}
