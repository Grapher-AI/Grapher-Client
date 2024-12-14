<template>
  <div class="paper-wrap">
    <div ref="promptWrapper" class="prompt-div-wrapper">
      <prompt-area v-if="mounted" @prompt-apply="promptApply" ref="promptArea" />
    </div>
    <div ref="paperDiv" id="paperDiv" class="paper"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PromptArea from '@/components/prompt-area.vue'
import homeScreenPreset from "@/jointjs-stuff/paperPresets/homeScreen";
import simpleBlockScheme from "@/jointjs-stuff/paperPresets/simpleBlockScheme";
import draw from "@/jointjs-stuff/draw"
import requestGraphSchema from "@/openai-stuff/requestGraphSchema";
import {dia} from "@joint/core";

const promptArea = ref<typeof PromptArea>()
const promptWrapper = ref<HTMLDivElement>()
const paperDiv = ref<HTMLDivElement>()

const mounted = ref(false)
// const props =
// defineProps<{
//   buttonClick: (str: string) => Promise<any>
// }>(

let graphAndPaper: {graph?: dia.Graph, paper?: dia.Paper} = {}

async function promptApply(prompt: string) {
  const schema = await requestGraphSchema(prompt).catch((v) => v)

  if(schema instanceof Error){
    return Promise.reject(schema);
  }

  draw(paperDiv.value!, { schema })
}

onMounted(() => {
  mounted.value = true
  graphAndPaper = homeScreenPreset(paperDiv.value!, {promptWrapper: promptWrapper.value!})


  console.log('graphAndPaper.graph.toJSON()',graphAndPaper.graph.toJSON());
  // graphAndPaper = simpleBlockScheme(paperDiv.value!);
  // graph.clear()
  // draw(paperDiv.value!, {graph: graph, paper: paper});
})
</script>

<style scoped>
.paper-wrap {
  width: 100%;
  height: 100%;
  flex: 1;
}
.paper {
  position: relative;
  width: 100%;
  height: 100%;
}
.prompt-div-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
