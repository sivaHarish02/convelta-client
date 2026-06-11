import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface CategoryCardProps {
    name: string
    slug: string
    description: string
    toolCount: number
    color: string
}

export default React.memo(function CategoryCard({ name, slug, description, toolCount, color }: CategoryCardProps) {
    return (
        <Link to={`/category/${slug}`} className="block group">
            <div className={`${color} rounded-2xl p-4 cursor-pointer transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md text-dark-navy h-full`}>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-sm leading-snug">{name}</h3>
                    <ChevronRight
                        size={14}
                        className="shrink-0 mt-0.5 opacity-60 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all duration-200"
                        aria-hidden="true"
                    />
                </div>
                <p className="text-[11px] leading-4 opacity-70 line-clamp-2 mb-2">{description}</p>
                <span className="text-[11px] font-semibold opacity-80">{toolCount} tools</span>
            </div>
        </Link>
    )
})
