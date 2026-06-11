import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

interface ToolCardProps {
    slug: string
    name: string
    description: string
    icon: string
    features: string[]
}

export default React.memo(function ToolCard({ slug, name, description, icon }: ToolCardProps) {
    return (
        <Link to={`/tools/${slug}`} className="block group">
            <div className="relative flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/75 p-3.5 shadow-[0_2px_10px_rgba(14,30,37,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(14,30,37,0.10)] hover:border-light-aqua/60 cursor-pointer h-full">
                {/* Accent top bar on hover */}
                <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-peach-orange to-light-aqua opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                <div className="flex items-start justify-between gap-2 mb-2.5">
                    {/* Icon */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-soft-cream text-lg transition-colors duration-200 group-hover:bg-light-aqua/50">
                        {icon}
                    </div>
                    {/* Arrow cue */}
                    <ArrowUpRight
                        size={14}
                        className="text-soft-gray opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-peach-orange shrink-0 mt-0.5"
                    />
                </div>

                <h3 className="text-sm font-bold text-dark-navy leading-snug mb-1">{name}</h3>
                <p className="text-xs leading-4 text-dark-gray line-clamp-2">{description}</p>
            </div>
        </Link>
    )
})
