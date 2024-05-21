import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import typescript2 from 'rollup-plugin-typescript2'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    typescript2({
      check: false,
      include: ['src/components/**/*.vue'],
      tsconfigOverride: {
        compilerOptions: {
          outDir: 'dist',
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ['vite.config.ts'],
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: 'src/components/vue-css.ts',
      name: 'vue-css',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `vue-css.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      input: {
        main: path.resolve(__dirname, 'src/components/index.ts'),
      },
      external: ['vue', '@squidit/css'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'main.scss') return 'vue-css.scss'
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
      '@': path.resolve(__dirname, 'src'),
    },
  },
})