<template>
  <div class="page">
    <header v-if="header">
      <slot name="header">
        <default-header />
      </slot>
    </header>
    <main v-if="main">
      <slot name="main">
        <default-main />
      </slot>
    </main>
    <footer v-if="footer">
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

interface Props {
  header?: boolean;
  main?: boolean;
  footer?: boolean;
}


const {header = true, footer = true, main = true} = defineProps<Props>();

</script>

<style scoped>
@import "@/assets/page.css";
</style>
