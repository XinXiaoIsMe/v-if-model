# vite-plugin-v-if-model

🧩 A Vite plugin that adds a custom `v-if-model` directive for Vue 3 — auto-expands to `v-if`, `v-model`, and `:key`, helping components (like dialogs) re-render correctly when visibility changes.

---

## ✨ Features

- ✅ Replaces `v-if-model` with `v-model`, `v-if`, and `:key`
- ✅ Supports arguments and modifiers (e.g., `v-if-model:visible.lazy`)
- ✅ Designed for Vue 3 + Vite
- ✅ Great for conditionally rendered components like dialogs

---

## 📦 Installation

```bash
npm i vite-plugin-v-if-model -D
```
or
```bash
pnpm add vite-plugin-v-if-model -D
```
## 🛠 Usage
1. Add to vite.config.ts

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vIfModel from 'vite-plugin-v-if-model'

export default defineConfig({
  plugins: [
    vue(),
    vIfModel(), // register here
  ],
})
```
2. Use v-if-model in Vue templates
```vue
<template>
  <Dialog v-if-model="dialogVisible" />
</template>

<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
</script>
```
Will compile to:
```vue
<Dialog
  v-model="dialogVisible"
  v-if="dialogVisible"
  :key="'vifmodel_' + (dialogVisible)"
/>
```
3. Supports arguments and modifiers
```vue
<Dialog v-if-model:visible.lazy.trim="dialogVisible" />
```
Expands to:
```vue
<Dialog
  v-model:visible.lazy.trim="dialogVisible"
  v-if="dialogVisible"
  :key="'vifmodel_' + (dialogVisible)"
/>
```