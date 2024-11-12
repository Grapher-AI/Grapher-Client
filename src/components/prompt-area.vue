<template>
<div ref="promptArea" class="prompt-area">
  <div class="pin">
    <span class="cloak">powered by ChatGPT</span>
    <div class="cloak"><el-button :icon="MagicStick" style="font-size: 18px" circle size="large"></el-button></div>
  </div>
  <el-input
    class="prompt-area-input"
    v-model="textarea"
    style="width: 480px; height: 320px"
    type="textarea"
    resize="none"
    placeholder="Please input"
  />
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MagicStick } from '@element-plus/icons-vue'

const textarea = ref('Prompt, prompt, promt,Prompt, prompt, promt,Prompt, prompt, promt')
const promptArea = ref<HTMLDivElement>();
function getRect() {
  return promptArea.value?.getBoundingClientRect();
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
  font-size: 24px !important;
  color: black !important;
  height: 100%;
}
</style>

<style scoped lang="css">
.prompt-area {
  position: absolute;
  z-index: 10000;
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.44);
  border: 3px solid rgba(149, 149, 149, 0.84);
  border-radius: 12px;
  top: 10%;
  right: 10%;
  //top: 100px;
  //left: 100px;

  div.pin{
    position: absolute;
    display: flex;
    align-items: center;
    transform: translate(0px, 50%);
    bottom: 0px;
    right: 1%;
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

</style>
