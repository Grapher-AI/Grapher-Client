<template>
<div class="paper-wrap">
  <prompt-area ref="promptArea" />
  <div ref="paperDiv" id="paperDiv" class="paper"></div>
</div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {type Ref} from 'vue'
import { dia, shapes, util, g } from '@joint/core';
import PromptArea from "@/components/prompt-area.vue";

const promptArea = ref()
const paperDiv = ref(null);

const namespace = shapes;

const graph = new dia.Graph({}, { cellNamespace: namespace });

onMounted(()=>{
  const paper = new dia.Paper({
    el: paperDiv.value,
    model: graph,
    width: '100%',
    height: '100%',
    drawGridSize: 10,
    gridSize: 10,
    drawGrid: true,
    background: { color: '#F5F5F5' },
    // drawGrid: {
    //   name: 'doubleMesh',
    //   args: [
    //     {
    //       color: '#7FDBFF', // Цвет основных линий сетки (светло-голубой)
    //       thickness: 0.2, // Толщина основных линий
    //     },
    //     {
    //       color: '#c7eefb', // Цвет второстепенных линий сетки
    //       thickness: 0.4, // Толщина второстепенных линий
    //       scaleFactor: 5,
    //     }
    //   ]
    // },
    // background: {
    //   // color: '#3883c3' // Темно-синий фон для эффекта чертежа
    //   color: '#589adc' // Темно-синий фон для эффекта чертежа
    // },
    cellViewNamespace: namespace
  });


  // const fillColor = '#589adc';
  // const strokeColor = '#c8eeff';
  const strokeColor = '#d89696';
  // const fillColor = '#ededed';
  const fillColor = 'rgb(243,243,243)';

  const rect1 = new shapes.standard.Rectangle();
  rect1.position(25, 25);
  rect1.resize(180, 50);
  rect1.addTo(graph);

  const rect2 = new shapes.standard.Rectangle();
  rect2.position(95, 225);
  rect2.resize(180, 50);
  rect2.addTo(graph);

  rect1.attr('body', { stroke: strokeColor,fill:fillColor, rx: 2, ry: 2 });
  rect2.attr('body', { stroke: strokeColor,fill:fillColor, rx: 2, ry: 2 });

  rect1.attr('label', { text: 'Welcome', fill: '#353535' });
  rect2.attr('label', { text: 'Grapher!', fill: '#353535' });

  const link1_2 = new shapes.standard.Link();
  link1_2.source(rect1);
  link1_2.target(rect2);
  link1_2.addTo(graph);

  link1_2.appendLabel({
    attrs: {
      text: {
        text: 'to the'
      }
    }
  });
  link1_2.router('orthogonal');
  link1_2.connector('straight', {  cornerType: 'line' });

  const rect3 = new shapes.standard.Rectangle({size:{width: 400, height: 100}});
  rect3.position(25, 425);
  // rect3.resize(180, 50);
  rect3.addTo(graph);
  rect3.attr('body', { stroke: strokeColor,fill:fillColor, rx: 2, ry: 2 });
  rect3.attr('label', { text: `Generates graphs, to response on your's ✨ amazing ✨ prompts!`, fill: '#353535' });

  const link2_3 = new shapes.standard.Link();
  link2_3.source(rect2);
  link2_3.target(rect3);
  link2_3.addTo(graph);

  link2_3.appendLabel({
    attrs: {
      text: {
        text: 'I can'
      }
    }
  });
  link2_3.router('orthogonal');
  link2_3.connector('straight', {  cornerType: 'line' });

  // const rect4 = new shapes.standard.Rectangle({size:{width: 400, height: 140}});
  // rect4.position(455, 155);
  // // rect4.resize(180, 50);
  // rect4.addTo(graph);
  // rect4.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 });
  // rect4.attr('label', { text: '', style:{fontSize: 24}, fill: '#353535',contenteditable: true });

  // paper.transformToFitContent({padding: 100});
  const link3_4 = new shapes.standard.Link();
  link3_4.source(rect3);
  // link3_4.target(rect4);
  const promptAreaRect = promptArea.value.getRect();
  // paper.transformToFitContent({padding: 100});
  console.log(promptAreaRect);
  link3_4.target({x:promptAreaRect.x + promptAreaRect.width / 2, y:promptAreaRect.y +  promptAreaRect.height});
  // link3_4.target({x:promptAreaRect.width / 2, y:promptAreaRect.height});
  // link3_4.target(new g.Point(100, 100));
  // link3_4.target({x:0, y:0});
  link3_4.addTo(graph);

  link3_4.appendLabel({
    attrs: {
      text: {
        text: 'Try here!'
      }
    }
  });
  link3_4.router('orthogonal');
  link3_4.connector('straight', {  cornerType: 'line' });
  // paper.transformToFitContent();
});

</script>


<style scoped>
.paper-wrap {
  width: 100%;
  height: 100%;
  flex: 1;
}
.paper{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
