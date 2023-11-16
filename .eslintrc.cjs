/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript/recommended', '@vue/eslint-config-prettier'],
  overrides: [
    {
      files: ['*.vue', '*.ts', '*.js', '*.tsx', '*.jsx', '*.cjs'],
      rules: {
        semi: [2, 'never'],
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
      },
    },
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
}
