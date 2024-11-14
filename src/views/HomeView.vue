<template>
  <page :footer="false" :header="false">
    <template #main class="homeView-main">
      <workbanch></workbanch>
    </template>
  </page>
</template>

<script setup lang="ts">
import Page from '@/components/base/page.vue'
import Workbanch from '@/components/workbanch.vue'
</script>

<style>
.homeView-main {
  display: flex;
}
</style>
