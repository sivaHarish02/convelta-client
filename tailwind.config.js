/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'deep-teal': '#0B5D63',
                'dark-teal': '#124C4F',
                'soft-cream': '#F6EFE3',
                'warm-beige': '#E8D8C4',
                'peach-orange': '#D97A45',
                'light-aqua': '#A9D7D3',
                'sky-cyan': '#78C6D0',
                'golden-sand': '#D9B27A',
                'muted-brown': '#8A5B3D',
                'white-smoke': '#FAF8F4',
                'soft-gray': '#CFC8BE',
                'dark-navy': '#0E1E25',
            },
            fontSize: {
                'xs': '0.75rem',
                'sm': '0.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'xl': '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
            },
            borderRadius: {
                'none': '0',
                'sm': '0.125rem',
                'base': '0.25rem',
                'md': '0.375rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            animation: {
                'fadeIn': 'fadeIn 0.3s ease-in',
                'slideUp': 'slideUp 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    'from': { opacity: '0' },
                    'to': { opacity: '1' },
                },
                slideUp: {
                    'from': { transform: 'translateY(10px)', opacity: '0' },
                    'to': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
