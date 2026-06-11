import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { categories } from '../../data/tools'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setIsOpen(false)
    }, [location.pathname])

    const getNavLinkClassName = (isActive: boolean, isMobile = false) => {
        const baseClassName = isMobile
            ? 'block rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200'
            : 'rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200'

        return `${baseClassName} ${isActive
            ? 'bg-white text-deep-teal shadow-sm'
            : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`
    }

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-deep-teal/95 shadow-[0_8px_24px_rgba(11,93,99,0.18)] backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <Link
                        to="/"
                        className="group flex items-center gap-2.5 rounded-full px-1 py-1 text-white transition-transform duration-200 hover:scale-[1.02]"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors duration-200 group-hover:bg-white/15">
                            <img src="/favicon.svg" alt="Convelta Logo" className="h-5 w-5" />
                        </span>
                        <span>
                            <span className="block text-base font-bold leading-none">Convelta</span>
                            <span className="block text-[10px] uppercase tracking-[0.24em] text-light-aqua/80">File Studio</span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-1 md:flex">
                        <NavLink
                            to="/tools"
                            className={({ isActive }) => getNavLinkClassName(isActive || location.pathname.startsWith('/tools/'))}
                        >
                            All Tools
                        </NavLink>
                        {categories.map((category) => (
                            <NavLink
                                key={category.id}
                                to={`/category/${category.slug}`}
                                className={({ isActive }) => getNavLinkClassName(isActive)}
                            >
                                {category.name.replace(' Converters', '').replace(' Tools', '')}
                            </NavLink>
                        ))}
                        <NavLink
                            to="/about"
                            className={({ isActive }) => getNavLinkClassName(isActive)}
                        >
                            About
                        </NavLink>
                    </div>

                    <button
                        type="button"
                        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {isOpen && (
                    <div className="pb-3 md:hidden">
                        <div className="space-y-1 rounded-2xl border border-white/10 bg-white/8 p-2.5 shadow-[0_8px_20px_rgba(14,30,37,0.15)] backdrop-blur-xl">
                            <NavLink
                                to="/tools"
                                className={({ isActive }) => getNavLinkClassName(isActive || location.pathname.startsWith('/tools/'), true)}
                            >
                                All Tools
                            </NavLink>
                            {categories.map((category) => (
                                <NavLink
                                    key={category.id}
                                    to={`/category/${category.slug}`}
                                    className={({ isActive }) => getNavLinkClassName(isActive, true)}
                                >
                                    {category.name.replace(' Converters', '').replace(' Tools', '')}
                                </NavLink>
                            ))}
                            <NavLink
                                to="/about"
                                className={({ isActive }) => getNavLinkClassName(isActive, true)}
                            >
                                About
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
