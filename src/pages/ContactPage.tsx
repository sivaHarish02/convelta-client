import SEO from '../components/common/SEO'
import { useState } from 'react'
import { Mail, MessageSquare, Loader } from 'lucide-react'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitted(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
            setTimeout(() => setSubmitted(false), 5000)
        }, 1500)
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <SEO 
                title="Contact Us | Convelta"
                description="Get in touch with the Convelta team for feedback, suggestions, or support."
                canonicalUrl="/contact"
            />
            <div className="w-full">
                <h1 className="text-4xl font-bold text-dark-navy mb-8 text-center">Get in Touch</h1>
                <p className="text-lg text-dark-gray text-center mb-12">
                    For support, feedback, or policy questions, contact us! We'd love to hear from you.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="card text-center">
                        <Mail className="mx-auto text-peach-orange mb-3" size={32} />
                        <h3 className="font-bold text-dark-navy mb-2">Email</h3>
                        <p className="text-sm text-dark-gray">support@convelta.com</p>
                    </div>
                    <div className="card text-center">
                        <MessageSquare className="mx-auto text-light-aqua mb-3" size={32} />
                        <h3 className="font-bold text-dark-navy mb-2">Chat</h3>
                        <p className="text-sm text-dark-gray">Live chat on our site</p>
                    </div>
                    <div className="card text-center">
                        <MessageSquare className="mx-auto text-sky-cyan mb-3" size={32} />
                        <h3 className="font-bold text-dark-navy mb-2">Feedback</h3>
                        <p className="text-sm text-dark-gray">Share your ideas</p>
                    </div>
                </div>

                {submitted && (
                    <div className="bg-light-aqua bg-opacity-20 border border-light-aqua rounded-2xl p-4 mb-6 text-center">
                        <p className="text-dark-navy font-medium">✓ Thank you! We'll get back to you soon.</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white-smoke rounded-2xl p-8">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-dark-navy mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-orange"
                            placeholder="Your name"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-dark-navy mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-orange"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-dark-navy mb-2">Subject</label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-orange"
                        >
                            <option value="">Select a subject</option>
                            <option value="bug">Bug Report</option>
                            <option value="feature">Feature Request</option>
                            <option value="feedback">General Feedback</option>
                            <option value="support">Support</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-dark-navy mb-2">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-orange resize-none"
                            placeholder="Tell us what's on your mind..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader size={18} className="animate-spin" /> Sending...
                            </>
                        ) : (
                            'Send Message'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
