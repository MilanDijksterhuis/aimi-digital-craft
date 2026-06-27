import { defineConfig } from '@tanstack/start/config'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    preset: 'node-server',
  },
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ['./tsconfig.json'] }),
    ],
    resolve: {
      alias: { '@': '/src' },
    },
  },
})
