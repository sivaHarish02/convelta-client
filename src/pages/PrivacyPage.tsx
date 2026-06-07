import SEO from '../components/common/SEO'

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <SEO 
                title="Privacy Policy | Convelta"
                description="Read our privacy policy to understand how Convelta protects your data and ensures secure file conversions."
                canonicalUrl="/privacy"
            />
            <div className="w-full">
                <h1 className="text-4xl font-bold text-dark-navy mb-8">Privacy Policy</h1>

                <div className="prose prose-lg max-w-none space-y-8 text-dark-gray">
                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Privacy at Convelta</h2>
                        <p>
                            We take your privacy seriously. This policy explains how we handle your data when using our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">What We Don't Collect</h2>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>We don't store your uploaded files on our servers</li>
                            <li>We don't collect personal information</li>
                            <li>We don't track you across websites</li>
                            <li>We don't sell your data</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">How We Work</h2>
                        <p>
                            All conversions happen in your browser. Your files never leave your device and are immediately
                            deleted after conversion. We only maintain basic analytics to understand usage patterns.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Cookies</h2>
                        <p>
                            We use minimal cookies only for essential functionality like remembering your preferences.
                            You can disable cookies in your browser settings if you prefer.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Third-Party Services</h2>
                        <p>
                            We use Vercel for hosting and may use Google Analytics. These services have their own privacy policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Contact Us</h2>
                        <p>
                            If you have privacy concerns, please email us at <span className="text-peach-orange">privacy@convelta.com</span>
                        </p>
                    </section>

                    <p className="text-sm text-soft-gray mt-12">
                        Last updated: {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    )
}
