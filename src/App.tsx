import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import LoadingScreen from './components/common/LoadingScreen'

const HomePage = React.lazy(() => import('./pages/HomePage'))
const ToolsPage = React.lazy(() => import('./pages/ToolsPage'))
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'))
const ConverterPage = React.lazy(() => import('./pages/ConverterPage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage'))
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'))
const ContactPage = React.lazy(() => import('./pages/ContactPage'))
const TermsPage = React.lazy(() => import('./pages/TermsPage'))

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-soft-cream">
                <Navbar />
                <main className="flex-1 flex flex-col">
                    <Suspense fallback={<LoadingScreen />}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/tools" element={<ToolsPage />} />
                            <Route path="/category/:categorySlug" element={<CategoryPage />} />
                            <Route path="/tools/:toolSlug" element={<ConverterPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/privacy" element={<PrivacyPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/terms" element={<TermsPage />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
                <Toaster position="bottom-center" />
            </div>
        </Router>
    )
}

export default App
