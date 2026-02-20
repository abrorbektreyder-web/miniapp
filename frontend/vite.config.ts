import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
  },
  build: {
    outDir: 'dist',
    // ⚡ No sourcemaps in production
    sourcemap: false,
    // ⚡ Aggressive minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    // ⚡ Better chunk splitting for parallel loading
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core — cached separately
          if (id.includes('react-dom') || id.includes('react/')) {
            return 'react-vendor';
          }
          // Router — small, cached
          if (id.includes('react-router')) {
            return 'router';
          }
          // Data fetching
          if (id.includes('@tanstack/react-query')) {
            return 'query';
          }
          // State management + HTTP
          if (id.includes('zustand') || id.includes('axios')) {
            return 'utils';
          }
        },
      },
    },
    // ⚡ Set chunk size warning limit
    chunkSizeWarningLimit: 250,
    // ⚡ CSS code splitting
    cssCodeSplit: true,
    // ⚡ Target modern browsers for smaller output
    target: 'es2020',
    // ⚡ Asset inlining threshold (small assets inline as base64)
    assetsInlineLimit: 4096,
  },
})


