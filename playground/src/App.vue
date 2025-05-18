<template>
  <div>
    <button @click="show = !show">Toggle Dialog</button>
    <Dialog v-if-model="show" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from './Dialog.vue'

const show = ref(false)
</script>
