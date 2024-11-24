import {dia, routers, shapes, util, layout} from "@joint/core";
import { DirectedGraph } from '@joint/layout-directed-graph';

import {BeginShape} from '@/jointjs-stuff/shapes/begin'
import {EndShape} from "@/jointjs-stuff/shapes/end";
import {ProcedureShape} from "@/jointjs-stuff/shapes/procedure";
import {ConditionShape} from "@/jointjs-stuff/shapes/condition";
import {ConditionOuterLink} from "@/jointjs-stuff/shapes/conditionOuterLink";
import {DefaultLink} from "@/jointjs-stuff/shapes/link";

const namespace = { shapes, customShapes: { BeginShape, EndShape, ProcedureShape, ConditionShape, ConditionOuterLink, DefaultLink } }


export default function simpleBlockScheme(paperDiv: HTMLDivElement, options: { graph?: dia.Graph, paper?: dia.Paper } = {}) {
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

// const fillColor = '#589adc';
// const strokeColor = '#c8eeff';
  const strokeColor = '#d89696'
// const fillColor = '#ededed';
  const fillColor = 'rgb(243,243,243)'

  const strokeWidth = 2
  const fontSize = 14
  // let yStep = 100
  // let xStep = 100
  // let xBaseline = 500
  // let yBaseline = 150
  let yStep = 0
  let xStep = 0
  let xBaseline = 0
  let yBaseline = 0

  const begin = new BeginShape()
  begin.addTo(graph)
  begin.position(xBaseline, yBaseline)
  begin.attr('label', { text: 'Begin' })

  const procedure1 = new ProcedureShape()
  procedure1.addTo(graph)
  procedure1.position(xBaseline, (yBaseline += yStep + procedure1.getBBox().height))
  procedure1.attr('label', { text: 'Process one' })

  const condition = new ConditionShape()
  condition.addTo(graph)
  condition.position(xBaseline, (yBaseline += yStep + condition.getBBox().height))
  condition.attr('label', { text: 'Condition one' })

  const procedure2 = new ProcedureShape()
  procedure2.addTo(graph)
  procedure2.position(xBaseline - xStep, (yBaseline += yStep + procedure2.getBBox().height))
  procedure2.attr('label', { text: 'Process two' })

  const procedure3 = new ProcedureShape()
  procedure3.addTo(graph)
  procedure3.position(xBaseline + xStep, yBaseline)
  procedure3.attr('label', { text: 'Process three' })

  const end = new EndShape()
  end.addTo(graph)
  end.position(xBaseline, (yBaseline += yStep + end.getBBox().height))
  end.attr('label', { text: 'End' })



  const linkB_p1 = new DefaultLink()
  linkB_p1.source(begin)
  linkB_p1.target(procedure1)
  linkB_p1.addTo(graph)
  linkB_p1.router('orthogonal')
  linkB_p1.connector('straight', { cornerType: 'line' })

  const linkP1_C1 = new DefaultLink()
  linkP1_C1.source(procedure1)
  linkP1_C1.target(condition)
  linkP1_C1.addTo(graph)
  linkP1_C1.router('orthogonal')
  linkP1_C1.connector('straight', { cornerType: 'line' })

  const linkC1_P2 = new ConditionOuterLink()
  linkC1_P2.source(condition)
  linkC1_P2.target(procedure2)
  linkC1_P2.addTo(graph)
  linkC1_P2.router('orthogonal')
  linkC1_P2.appendLabel({
    attrs: {
      text: {
        text: 'Yes',
      },
    },
  })
  linkC1_P2.connector('straight', { cornerType: 'line' })
  linkC1_P2.router('rightAngle', {
      margin: 25,
      sourceDirection: routers.rightAngle.Directions.TOP,
      targetDirection: routers.rightAngle.Directions.LEFT,
    })

  const linkC1_P3 = new ConditionOuterLink()
  linkC1_P3.source(condition)
  linkC1_P3.target(procedure3)
  linkC1_P3.addTo(graph)
  linkC1_P3.appendLabel({
    attrs: {
      text: {
        text: 'No',
      },
    },
  })
  linkC1_P3.router('orthogonal')
  linkC1_P3.connector('straight', { cornerType: 'line' })
  linkC1_P3.router('rightAngle', {
    margin: 25,
    sourceDirection: routers.rightAngle.Directions.BOTTOM,
    targetDirection: routers.rightAngle.Directions.LEFT,
  })

  const linkP2_E = new DefaultLink()
  linkP2_E.source(procedure2)
  linkP2_E.target(end)
  linkP2_E.addTo(graph)
  linkP2_E.router('orthogonal')
  linkP2_E.connector('straight', { cornerType: 'line' })

  const linkP3_E = new DefaultLink()
  linkP3_E.source(procedure3)
  linkP3_E.target(end)
  linkP3_E.addTo(graph)
  linkP3_E.router('orthogonal')
  linkP3_E.connector('straight', { cornerType: 'line' })

  console.log('graph',graph)
  console.log('paper',paper)
  DirectedGraph.layout(graph, {
    nodeSep: 50,
    edgeSep: 80,
    rankDir: 'LR'
  });
  paper.transformToFitContent({ padding: 100 })

  return {paper, graph}
}
