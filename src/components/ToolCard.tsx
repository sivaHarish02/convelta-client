import React from 'react'
import { Link } from 'react-router-dom'

interface ToolCardProps {
    slug: string
    name: string
    description: string
    icon: string
    features: string[]
}

export default React.memo(function ToolCard({ slug, name, description, icon, features }: ToolCardProps) {
    return (
        <div className="h-full transition-transform duration-300 hover:-translate-y-2">
            <Link to={`/tools/${slug}`} className="block h-full">
                <div className="card group relative flex h-full cursor-pointer flex-col overflow-hidden p-0">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-peach-orange via-sky-cyan to-light-aqua opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="flex h-full flex-col p-6">
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-soft-cream text-4xl shadow-inner shadow-white/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg] group-hover:bg-light-aqua/55">
                                {icon}
                            </div>
                            <span className="rounded-full bg-dark-navy/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-gray">
                                Convert
                            </span>
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-dark-navy">{name}</h3>
                        <p className="mb-5 line-clamp-3 text-sm leading-6 text-dark-gray">{description}</p>
                        <div className="mt-auto flex flex-wrap gap-2">
                            {features.slice(0, 2).map((feature, idx) => (
                                <span
                                    key={idx}
                                    className="rounded-full bg-light-aqua/70 px-3 py-1 text-xs font-medium text-dark-navy"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
})
