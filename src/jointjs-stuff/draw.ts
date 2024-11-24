import {dia, routers, shapes, util, layout} from "@joint/core";
import { DirectedGraph } from '@joint/layout-directed-graph';

import {BeginShape} from '@/jointjs-stuff/shapes/begin'
import {EndShape} from "@/jointjs-stuff/shapes/end";
import {ProcedureShape} from "@/jointjs-stuff/shapes/procedure";
import {ConditionShape} from "@/jointjs-stuff/shapes/condition";
import {ConditionOuterLink} from "@/jointjs-stuff/shapes/conditionOuterLink";
import {DefaultLink} from "@/jointjs-stuff/shapes/link";

const namespace = { shapes, customShapes: { BeginShape, EndShape, ProcedureShape, ConditionShape, ConditionOuterLink, DefaultLink } }

export default function draw(paperDiv: HTMLDivElement | null, options: { graph?: dia.Graph, paper?: dia.Paper, schema: object }) {
  const graph = options.graph || new dia.Graph({}, { cellNamespace: namespace })
  const paper = options.paper || new dia.Paper({
    el: paperDiv,
    model: graph,
    width: '100%',
    height: '100%',
    // width: document.body.getBoundingClientRect().width,
    // height: document.body.getBoundingClientRect().height,
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
    cellViewNamespace: namespace,
  });

  graph.clear();

  graph.fromJSON(options.schema);

  DirectedGraph.layout(graph, {
    nodeSep: 50,
    edgeSep: 80,
    rankDir: 'LR'
  });

  paper.transformToFitContent({ padding: 100 })

  return {paper, graph}
}
