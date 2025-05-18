<template>
  <div class="dialog" v-if="modelValue" style="padding:1em; border:1px solid #333; margin-top:10px;">
    <p>This is a dialog</p>
    <button @click="$emit('update:modelValue', false)">Close</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

defineModel<boolean>({
  default: false
})

onMounted(() => {
  // print mounted when open dialog
  console.log('mounted')
})
</script>
