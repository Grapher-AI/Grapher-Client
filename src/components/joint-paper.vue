<template>
<div class="paper-wrap">
  <div ref="paperDiv" id="paperDiv"></div>
</div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import { dia, shapes } from '@joint/core';

const paperDiv = ref(null);

const namespace = shapes;

const graph = new dia.Graph({}, { cellNamespace: namespace });

onMounted(()=>{
  const paper = new dia.Paper({
    el: paperDiv.value,
    model: graph,
    width: 300,
    height: 300,
    background: { color: '#F5F5F5' },
    cellViewNamespace: namespace
  });

  const rect1 = new shapes.standard.Rectangle();
  rect1.position(25, 25);
  rect1.resize(180, 50);
  rect1.addTo(graph);

  const rect2 = new shapes.standard.Rectangle();
  rect2.position(95, 225);
  rect2.resize(180, 50);
  rect2.addTo(graph);
  
  rect1.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 });
  rect2.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 });

  rect1.attr('label', { text: 'Hello', fill: '#353535' });
  rect2.attr('label', { text: 'World!', fill: '#353535' });

  const link = new shapes.standard.Link();
  link.source(rect1);
  link.target(rect2);
  link.addTo(graph);

  link.appendLabel({
    attrs: {
      text: {
        text: 'to the'
      }
    }
  });
  link.router('orthogonal');
  link.connector('straight', {  cornerType: 'line' });
});

</script>


<style scoped>

</style>
