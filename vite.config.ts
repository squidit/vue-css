import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    libInjectCss(),
  ],
  build: {
    cssCodeSplit: false, // Desabilite o code splitting de CSS para garantir que o CSS esteja no mesmo arquivo da biblioteca
    lib: {
      entry: 'src/vue-css.ts',
      name: 'vue-css',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `vue-css.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@squidit/css'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'vue-css.css'
          return assetInfo.name || ''
        },
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@src': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
    },
  },
})
