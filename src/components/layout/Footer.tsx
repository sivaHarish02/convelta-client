import { Link } from 'react-router-dom'
import { Github, Twitter, Mail } from 'lucide-react'
import { categories } from '../../data/tools'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-dark-navy text-white-smoke mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="font-bold text-base mb-1.5 flex items-center gap-2">
                            <img src="/favicon.svg" alt="Convelta Logo" className="h-5 w-5" /> Convelta
                        </h3>
                        <p className="text-xs text-soft-gray leading-5">
                            Fast, simple file conversion with no signup required.
                        </p>
                    </div>

                    {/* Tools */}
                    <div>
                        <h4 className="font-semibold text-sm mb-3">Converters</h4>
                        <ul className="space-y-1.5 text-xs">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link to={`/category/${category.slug}`} className="text-soft-gray hover:text-light-aqua transition-colors">
                                        {category.name.replace(' Converters', '').replace(' Tools', '')}
                                    </Link>
                                </li>
                            ))}
                            <li><Link to="/tools" className="text-soft-gray hover:text-light-aqua transition-colors">All Tools</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-sm mb-3">Company</h4>
                        <ul className="space-y-1.5 text-xs">
                            <li><Link to="/about" className="text-soft-gray hover:text-light-aqua transition-colors">About</Link></li>
                            <li><Link to="/contact" className="text-soft-gray hover:text-light-aqua transition-colors">Contact</Link></li>
                            <li><Link to="/privacy" className="text-soft-gray hover:text-light-aqua transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-soft-gray hover:text-light-aqua transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-semibold text-sm mb-3">Follow Us</h4>
                        <div className="flex gap-3">
                            <a href="#" aria-label="Convelta Github" className="text-soft-gray hover:text-light-aqua transition-colors">
                                <Github size={17} aria-hidden="true" />
                            </a>
                            <a href="#" aria-label="Convelta Twitter" className="text-soft-gray hover:text-light-aqua transition-colors">
                                <Twitter size={17} aria-hidden="true" />
                            </a>
                            <a href="#" aria-label="Contact Convelta by Email" className="text-soft-gray hover:text-light-aqua transition-colors">
                                <Mail size={17} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                    <div className="flex flex-col md:flex-row justify-between items-center text-xs text-soft-gray gap-1">
                        <p>&copy; {currentYear} Convelta. All rights reserved.</p>
                        <p>Made with ❤️ for effortless file conversion</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
