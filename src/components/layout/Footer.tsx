import { Link } from 'react-router-dom'
import { Github, Twitter, Mail } from 'lucide-react'
import { categories } from '../../data/tools'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-dark-navy text-white-smoke mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <img src="/favicon.svg" alt="Convelta Logo" className="h-6 w-6" /> Convelta
                        </h3>
                        <p className="text-sm text-soft-gray">
                            Convelta makes modern file conversion simple, fast, and dependable.
                        </p>
                    </div>

                    {/* Tools */}
                    <div>
                        <h4 className="font-semibold mb-4">Converters</h4>
                        <ul className="space-y-2 text-sm">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link to={`/category/${category.slug}`} className="hover:text-light-aqua transition-colors">
                                        {category.name.replace(' Converters', '').replace(' Tools', '')}
                                    </Link>
                                </li>
                            ))}
                            <li><Link to="/tools" className="hover:text-light-aqua transition-colors">All Tools</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-light-aqua transition-colors">About</Link></li>
                            <li><Link to="/contact" className="hover:text-light-aqua transition-colors">Contact</Link></li>
                            <li><Link to="/privacy" className="hover:text-light-aqua transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-light-aqua transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" aria-label="Convelta Github" className="hover:text-light-aqua transition-colors">
                                <Github size={20} aria-hidden="true" />
                            </a>
                            <a href="#" aria-label="Convelta Twitter" className="hover:text-light-aqua transition-colors">
                                <Twitter size={20} aria-hidden="true" />
                            </a>
                            <a href="#" aria-label="Contact Convelta by Email" className="hover:text-light-aqua transition-colors">
                                <Mail size={20} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-soft-gray pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-soft-gray">
                        <p>&copy; {currentYear} Convelta. All rights reserved.</p>
                        <p>Made with ❤️ for effortless file conversion</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
