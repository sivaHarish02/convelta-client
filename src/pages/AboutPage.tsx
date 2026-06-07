import SEO from '../components/common/SEO'

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <SEO 
                title="About Us | Convelta"
                description="Learn about Convelta's mission to provide fast, reliable, and free online file conversion tools for everyone."
                canonicalUrl="/about"
            />
            <div className="w-full">
                <h1 className="text-4xl font-bold text-dark-navy mb-8">About Us</h1>

                <div className="space-y-8 text-lg text-dark-gray">
                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Our Mission</h2>
                        <p>
                            We believe file conversion should be fast and simple. Our mission is to provide a safe,
                            reliable platform where anyone can convert their files without hassle, costs, or privacy concerns.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">What We Offer</h2>
                        <p>
                            Convelta offers 10+ powerful converters covering:
                        </p>
                        <ul className="list-disc ml-6 mt-4 space-y-2">
                            <li>Data Conversion (JSON, Excel, CSV)</li>
                            <li>Image Conversion (JPG, PNG, WEBP)</li>
                            <li>Document Generation (PDF from images and text)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Why Choose Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                            {[
                                { title: 'No Signup', desc: 'Start converting immediately' },
                                { title: 'No Limits', desc: 'Convert as many files as you want' },
                                { title: 'No Ads', desc: 'Clean, distraction-free experience' },
                                { title: 'Secure', desc: 'Your files are never stored on servers' },
                                { title: 'Fast', desc: 'Instant conversion on your device' },
                                { title: 'Free', desc: 'Forever free, no hidden charges' },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white-smoke rounded-2xl p-6">
                                    <h3 className="font-bold text-dark-navy mb-2">{item.title}</h3>
                                    <p className="text-sm text-dark-gray">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Our Commitment</h2>
                        <p>
                            We're committed to continuously improving our platform, adding new converters, and ensuring
                            the best user experience possible. Your feedback helps us grow.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
