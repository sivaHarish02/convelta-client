import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react-router-dom') || id.includes('react-router')) return 'router'
                        if (id.includes('react/') || id.includes('react-dom/')) return 'react'
                        if (id.includes('framer-motion')) return 'motion'
                        if (id.includes('lucide-react')) return 'icons'
                        return 'vendor'
                    }
                }
            }
        }
    },
    server: {
        port: 5174,
        open: true
    }
})
