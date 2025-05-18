import type { Plugin } from 'vite'
import { parse as parseSFC } from '@vue/compiler-sfc'

export default function vIfModelPlugin(): Plugin {
  return {
    name: 'vite-plugin-v-if-model',
    enforce: 'pre',

    transform(code, id) {
      if (!id.endsWith('.vue') || !code.includes('v-if-model')) return

      const { descriptor } = parseSFC(code)
      const templateBlock = descriptor.template
      if (!templateBlock) return

      let template = templateBlock.content

      // 替换 v-if-model 指令为 v-model + v-if + :key
      template = template.replace(/v-if-model(?::([\w]+))?(?:\.([\w.]+))?="([^"]+)"/g, (_, arg, modifiers, exp) => {
        const modelArg = arg ? `:${arg}` : ''
        const modelMods = modifiers ? `.${modifiers}` : ''
        const modelDir = `v-model${modelArg}${modelMods}="${exp}"`
        const ifDir = `v-if="${exp}"`
        const keyDir = `:key="'vifmodel_' + (${exp})"`
        return `${modelDir} ${ifDir} ${keyDir}`
      })

      // 将替换后的 template 替换回 code
      const updatedCode = code.replace(templateBlock.content, template)

      return {
        code: updatedCode,
        map: null,
      }
    },
  }
}
