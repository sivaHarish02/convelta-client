import React from 'react'
import ToolCard from '../ToolCard'
import { getIconEmoji } from '../../data/tools'

interface RelatedToolsProps {
    relatedTools: any[]
}

export default React.memo(function RelatedTools({ relatedTools }: RelatedToolsProps) {
    if (relatedTools.length === 0) return null

    return (
        <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-peach-orange">Explore more</p>
                    <h3 className="text-base font-bold text-dark-navy leading-tight">Related converters</h3>
                </div>
                <p className="text-xs text-dark-gray hidden sm:block">Switch quickly without leaving the workflow.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {relatedTools.map(relatedTool => (
                    <ToolCard
                        key={relatedTool.slug}
                        slug={relatedTool.slug}
                        name={relatedTool.name}
                        description={relatedTool.description}
                        icon={getIconEmoji(relatedTool.slug)}
                        features={relatedTool.features}
                    />
                ))}
            </div>
        </div>
    )
})
