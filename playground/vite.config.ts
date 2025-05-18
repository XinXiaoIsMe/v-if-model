import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vIfModel from '../src/index'

export default defineConfig({
  plugins: [vue(), vIfModel()],
  server: {
    port: 3001,
  },
})
