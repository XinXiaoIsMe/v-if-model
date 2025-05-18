import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  // 避免tsup将@vue/compiler-sfc打包进产物
  external: ['@vue/compiler-sfc'],
})
