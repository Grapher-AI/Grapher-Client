<template>
<div class="workbanch">
  <span> {{ counter.count }}</span>
  <div class="control">
    <el-button round @click="counter.increment()">Increment</el-button>
    <el-button round @click="counter.double()">Double</el-button>
  </div>
</div>
</template>

<script setup lang="ts">
import {useCounterStore} from "@/stores/counter";

const counter = useCounterStore();

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
