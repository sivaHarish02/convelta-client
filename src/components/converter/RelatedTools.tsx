import React from 'react'
import ToolCard from '../ToolCard'
import { getIconEmoji } from '../../data/tools'

interface RelatedToolsProps {
    relatedTools: any[]
}

export default React.memo(function RelatedTools({ relatedTools }: RelatedToolsProps) {
    if (relatedTools.length === 0) return null

    return (
        <div className="mt-10">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-peach-orange">Explore more</p>
                    <h3 className="text-2xl font-bold text-dark-navy">Related converters</h3>
                </div>
                <p className="text-sm text-dark-gray">Switch quickly without leaving the workflow.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
