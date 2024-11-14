<template>
<div ref="promptArea" class="prompt-area">
  <el-input
    class="prompt-area-input"
    v-model="textarea"
    type="textarea"
    resize="none"
    placeholder="Best place for your prompts are here ♥️"
  />
  <div class="pin">
    <span class="cloak">powered by ChatGPT</span>
    <div class="cloak"><el-button :icon="MagicStick" style="font-size: 18px" circle size="large"></el-button></div>
  </div>
</div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import { MagicStick } from '@element-plus/icons-vue'

const textarea = ref('')
const promptArea = ref<HTMLDivElement>();

function getRect() {
  // console.log('promptArea.value?.getBoundingClientRect()',promptArea.value?.getBoundingClientRect());
  return promptArea.value?.getBoundingClientRect();
  // return {width: promptArea.value?.clientWidth, height: promptArea.value?.clientHeight};
  // return size.value
  // return sizeWithboundaryes.value
}

function move() {

}

defineExpose({
  move,
  getRect
})

</script>

<style>
textarea {
  box-shadow: none !important;
  background-color: rgba(255, 255, 255, 0) !important;
  font-size: 14px !important;
  color: black !important;
  height: 100%;
}
</style>

<style scoped lang="css">
.prompt-area {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10000;
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.44);
  border: 1px solid rgba(149, 149, 149, 0.84);
  border-radius: 12px;

  div.pin{
    position: absolute;
    display: flex;
    align-items: center;
    transform: translate(0px, 50%);
    bottom: 0px;
    right: 2%;
    span {
      color: rgb(12 163 127);
      font-family: var(--sans-serif);
      font-size: 14px;
    }

    .cloak{
      background: #F5F5F5;
      padding: 0 3px;
      margin: 0 3px;
      border-radius: 29px;
    }
  }
}
.prompt-area-input{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
}
</style>
