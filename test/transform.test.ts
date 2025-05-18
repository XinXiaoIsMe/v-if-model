import { describe, it, expect } from 'vitest'
import vIfModelPlugin from '../src/index'

function runTransform(template: string): string {
  const plugin = vIfModelPlugin()
  const input = `<template>${template}</template>`
  const transform = plugin.transform

  let result: any
  if (typeof transform === 'function') {
    result = transform.call({} as any, input, 'Test.vue')
  } else if (transform && typeof transform === 'object' && typeof transform.handler === 'function') {
    result = transform.handler.call({} as any, input, 'Test.vue')
  } else {
    return input
  }

  if (typeof result === 'string') return result
  if (result && typeof result === 'object' && 'code' in result) return result.code
  return input
}

describe('v-if-model plugin', () => {
  it('transforms v-if-model into v-if + v-model + :key', () => {
    const result = runTransform(`<Comp v-if-model="dialogVisible" />`)
    expect(result).toContain('v-if="dialogVisible"')
    expect(result).toContain('v-model="dialogVisible"')
    expect(result).toContain(':key="\'vifmodel_\' + (dialogVisible)"')
  })

  it('preserves v-model argument', () => {
    const result = runTransform(`<Comp v-if-model:visible="visible" />`)
    expect(result).toContain('v-model:visible="visible"')
    expect(result).toContain('v-if="visible"')
  })

  it('preserves v-model modifiers', () => {
    const result = runTransform(`<Comp v-if-model:visible.lazy.trim="visible" />`)
    expect(result).toContain('v-model:visible.lazy.trim="visible"')
    expect(result).toContain(':key="\'vifmodel_\' + (visible)"')
    expect(result).toContain('v-if="visible"')
  })

  it('does not transform if v-if-model not present', () => {
    const original = `<Comp v-model="something" />`
    const result = runTransform(original)
    expect(result).toContain(original)
  })
})
