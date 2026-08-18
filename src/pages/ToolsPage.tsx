import SEO from '../components/common/SEO'
import ToolCard from '../components/ToolCard'
import AdSlot from '../components/AdSlot'
import { tools, categories, getIconEmoji } from '../data/tools'

export default function ToolsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <SEO
                title="All Tools & Converters - Free Online Converter Toolkit | Convelta"
                description={`Choose from our collection of ${tools.length} free online conversion tools. Convert JSON, Excel, CSV, images, and PDFs.`}
                canonicalUrl="/tools"
            />
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold text-dark-navy mb-1">All Tools & Converters</h1>
                <p className="text-sm text-dark-gray">
                    {tools.length} free online tools — no signup required
                </p>
            </div>

            <div className="space-y-10">
                {categories.map((category) => {
                    const categoryTools = tools.filter(tool => tool.category === category.id)
                    if (categoryTools.length === 0) return null

                    return (
                        <section key={category.id} className="scroll-mt-20">
                            <div className="border-b border-soft-gray/30 pb-3 mb-4">
                                <h2 className="text-base font-bold text-dark-navy flex items-center gap-2">
                                    <span className="w-1 h-4 rounded-full bg-peach-orange inline-block"></span>
                                    {category.name}
                                </h2>
                                <p className="text-xs text-dark-gray mt-0.5">{category.description}</p>
                            </div>
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
                        </section>
                    )
                })}
            </div>

            {/* AdSlot placed after all content - content-first policy */}
            <div className="mt-10">
                <AdSlot />
            </div>
        </div>
    )
}
