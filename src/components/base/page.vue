<template>
  <div class="page">
    <header>
      <slot name="header">
        <default-header />
      </slot>
    </header>
    <main>
      <slot name="main">
        <default-main />
      </slot>
    </main>
    <footer>
      <slot name="footer">
        <default-footer />
      </slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import DefaultHeader from "@/components/base/default-header.vue";
import DefaultMain from "@/components/base/default-main.vue";
import DefaultFooter from "@/components/base/default-footer.vue";
</script>

<style scoped>
@import "@/assets/page.css";
</style>
