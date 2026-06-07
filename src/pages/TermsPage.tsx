import SEO from '../components/common/SEO'

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <SEO 
                title="Terms of Service | Convelta"
                description="Read the Terms of Service for Convelta - free online file conversion toolkit. Understand usage policies, limitations, and your rights."
                canonicalUrl="/terms"
            />
            <div className="w-full">
                <h1 className="text-4xl font-bold text-dark-navy mb-8">Terms of Service</h1>

                <div className="prose prose-lg max-w-none space-y-8 text-dark-gray">
                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Acceptance of Terms</h2>
                        <p>
                            By accessing and using Convelta, you accept and agree to be bound by these Terms of Service.
                            If you do not agree to these terms, please do not use our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Description of Service</h2>
                        <p>
                            Convelta provides free online file conversion tools including data format converters,
                            image processors, document generators, and developer utilities. We reserve the right to
                            modify, suspend, or discontinue any part of the service at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Acceptable Use</h2>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>You may use the service for lawful purposes only</li>
                            <li>You must not upload malicious, illegal, or copyrighted content without authorization</li>
                            <li>You must not attempt to overload, disrupt, or exploit the service</li>
                            <li>Automated or bulk usage beyond reasonable limits is prohibited</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">File Handling</h2>
                        <p>
                            Files uploaded for conversion are processed on our servers and automatically deleted after
                            conversion is complete. We do not retain, archive, or share your files. Output files are
                            temporarily available for download and are periodically cleaned up.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Intellectual Property</h2>
                        <p>
                            The Convelta name, logo, interface design, and underlying code are the intellectual property
                            of Convelta. You retain all rights to your uploaded content and converted output files.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Limitation of Liability</h2>
                        <p>
                            Convelta is provided &quot;as is&quot; without warranties of any kind. We are not liable for any
                            data loss, corruption, or damages arising from the use of our service. Always keep backups
                            of your original files before conversion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Service Availability</h2>
                        <p>
                            We strive for high availability but do not guarantee uninterrupted access. Maintenance
                            windows, updates, or unforeseen issues may cause temporary downtime.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Changes to Terms</h2>
                        <p>
                            We may update these terms from time to time. Continued use of the service after changes
                            constitutes acceptance of the updated terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-dark-navy mb-4">Contact</h2>
                        <p>
                            For questions about these terms, please contact us at{' '}
                            <span className="text-peach-orange">legal@convelta.com</span>
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
