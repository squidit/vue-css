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
    cssCodeSplit: false,
    lib: {
      entry: 'src/vue-css.ts',
      name: 'vue-css',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `vue-css.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vue-i18n', '@squidit/css'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'vue-css.css'
          return assetInfo.name || ''
        },
        exports: 'named',
        globals: {
          vue: 'Vue',
          'vue-i18n': 'VueI18n',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@img': path.resolve(__dirname, './public/img'),
      '@locales': path.resolve(__dirname, './public/locales'),
      '@src': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
    },
  },
})
