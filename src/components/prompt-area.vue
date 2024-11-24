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
      <div class="cloak">
        <el-button @click="$emit('promptApply', textarea)" :icon="MagicStick" style="font-size: 18px" circle size="large"></el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { MagicStick } from '@element-plus/icons-vue'

const textarea = ref('')
const promptArea = ref<HTMLDivElement>()

function getRect() {
  return promptArea.value?.getBoundingClientRect()
}

function move() {}

defineExpose({
  move,
  getRect,
})
</script>

<style>
textarea {
  box-shadow: none !important;
  background-color: rgba(255, 255, 255, 0) !important;
  font-size: 14px !important;
  height: 100%;
  font-family: var(--sans-serif) !important;
  font-feature-settings: var(--fontFeature) 0;
  --el-input-text-color: #353740;
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

  div.pin {
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

    .cloak {
      background: #f5f5f5;
      padding: 0 3px;
      margin: 0 3px;
      border-radius: 29px;

      button:hover,button:focus {
        color: rgb(36 164 133);
        border-color: rgb(31 204 163 / 29%);
        background-color: rgb(51 228 186 / 8%);
      }
      button:active {
        color: rgb(36 164 133);
        border-color: rgba(31, 204, 163, 0.7);
        background-color: rgb(51 228 186 / 8%);
      }
    }
  }
}
.prompt-area-input {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
}
</style>
