<template>
  <div class="header">
    <el-icon class="item" size="32"><Apple /></el-icon>
    <a class="item link" :class="$route.path === '/' && 'hovered'" @click="$router.push('/')"
      >Workbanch</a
    >
    <span class="item">~</span>
    <a
      class="item link"
      :class="$route.path === '/about' && 'hovered'"
      @click="$router.push('/about')"
      >About</a
    >
  </div>
</template>

<script setup lang="ts">
// todo underline на выбранной странцие сохранять
</script>

<style scoped>
.header {
  display: flex;
  .item {
    font-size: 32px;
    margin: 0px 4px;
  }

  .link:hover {
    cursor: pointer;
    text-underline: black;
  }

  .hovered {
    text-decoration: underline solid black;
    text-decoration-thickness: from-font;
    text-underline-position: under;
  }
}
</style>
