/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(() => {
  const plugins = [react()]

  // Add an optional bundle visualizer when ANALYZE env var is set.
  const analyze = typeof globalThis !== 'undefined' && globalThis.process && (globalThis.process.env.ANALYZE === 'true' || globalThis.process.env.ANALYZE === '1')
  if (analyze) {
    plugins.push(
      // generates `dist/stats.html` with a visual breakdown of bundles
      visualizer({ filename: 'dist/stats.html', open: false })
    )
  }

  return {
    // Vercel root-level deploy için base '/' olarak ayarlandı.
    // GitHub Pages'e deploy edilecekse '/money-guard-app/' olarak değiştir.
    base: '/',
    plugins,
    build: {
      // warn earlier while we iterate on chunking
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split node_modules into per-package chunks to avoid giant vendor bundles
            if (id.includes('node_modules')) {
              try {
                const seg = id.split(/node_modules[\\/]/)[1]
                const parts = seg.split(/[\\/]/)
                let pkg = parts[0]
                if (pkg && pkg.startsWith('@')) pkg = `${pkg}/${parts[1]}`
                // sanitize for a file-name friendly chunk id
                return `vendor_${pkg.replace('/', '_')}`
              } catch {
                return 'vendor'
              }
            }
          },
        },
      },
    },
  }
})
