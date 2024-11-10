<template>
<div class="workbanch">
  <joint-paper></joint-paper>
</div>
</template>

<script setup lang="ts">
import JointPaper from "@/components/joint-paper.vue";

</script>

<style scoped>
.workbanch{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  .control {
    display: flex;
  }
}
</style>
