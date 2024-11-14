<template>
  <div class="workbanch">
    <joint-paper></joint-paper>
  </div>
</template>

<script setup lang="ts">
import JointPaper from '@/components/joint-paper.vue'
</script>

<style scoped>
.workbanch {
  display: flex;
  flex-grow: 1;
  position: relative;
  .control {
    display: flex;
  }
}
</style>
