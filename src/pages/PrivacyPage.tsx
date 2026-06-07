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
                            Convelta is a free online converter toolkit. We take your privacy seriously. This policy explains how we handle your data when using our service.
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
                            Uploaded files are used only for conversion purposes. All conversions happen in your browser or are processed securely and temporarily on our servers. Your files are immediately deleted after conversion. We only maintain basic analytics to understand usage patterns.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Cookies & Advertisements</h2>
                        <p>
                            We use minimal cookies for essential functionality like remembering your preferences, as well as for analytics and serving advertisements.
                        </p>
                        <ul className="list-disc ml-6 mt-4 space-y-2">
                            <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.</li>
                            <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.</li>
                            <li>You can manage ad personalization and opt-out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-peach-orange underline">Google Ad Settings</a>.</li>
                        </ul>
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
