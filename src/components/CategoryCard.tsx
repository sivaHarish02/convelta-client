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
        <div className="h-full transition-transform duration-300 hover:-translate-y-2">
            <Link to={`/category/${slug}`}>
                <div className={`${color} rounded-2xl p-8 cursor-pointer hover:shadow-lg transition-all group text-dark-navy`}>
                    <h3 className="font-bold text-2xl mb-2">{name}</h3>
                    <p className="text-sm mb-4 opacity-80">{description}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{toolCount} converters</span>
                        <ChevronRight className="group-hover:translate-x-2 transition-transform" size={20} aria-hidden="true" />
                    </div>
                </div>
            </Link>
        </div>
    )
})
