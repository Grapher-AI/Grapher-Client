import {dia, routers, shapes} from "@joint/core";
import {PromptShape, PromptShapeView} from "@/jointjs-stuff/shapes/prompt-shape";

const namespace = { shapes, customShapes: { PromptShape, PromptShapeView } }

export default function homeScreenPreset(paperDiv: HTMLDivElement, options: { graph?: dia.Graph, paper?: dia.Paper, promptWrapper: HTMLElement }) {
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

  const rect1 = new shapes.standard.Rectangle({ size: { width: 180, height: 50 } })
  rect1.position(25, 25)
  rect1.addTo(graph)
  rect1.attr('body', {
    stroke: strokeColor,
    fill: fillColor,
    rx: 2,
    ry: 2,
    strokeWidth: strokeWidth,
  })
  rect1.attr('label', { text: 'Welcome', fill: '#353535', fontSize: fontSize })

  const rect2 = new shapes.standard.Rectangle({ size: { width: 180, height: 50 } })
  rect2.position(135, 225)
  rect2.addTo(graph)
  rect2.attr('body', {
    stroke: strokeColor,
    fill: fillColor,
    rx: 2,
    ry: 2,
    strokeWidth: strokeWidth,
  })
  rect2.attr('label', { text: 'Grapher!', fill: '#353535', fontSize: fontSize })

  const rect3 = new shapes.standard.Rectangle({ size: { width: 380, height: 50 } })
  rect3.position(175, 425)
  rect3.addTo(graph)
  rect3.attr('body', {
    stroke: strokeColor,
    fill: fillColor,
    rx: 2,
    ry: 2,
    borderWidth: 10,
    strokeWidth: strokeWidth,
  })
  rect3.attr('label', {
    text: `Generates graphs, to response on your's ✨ amazing ✨ prompts!`,
    fill: '#353535',
    fontSize: fontSize,
  })

  const promptShape = new PromptShape()
  promptShape.addTo(graph)
  promptShape.applyForeign!(options.promptWrapper)
  promptShape.resize(455, 190)
  promptShape.position(455, 25)

  const link1_2 = new shapes.standard.Link()
  link1_2.source(rect1)
  link1_2.target(rect2)
  link1_2.addTo(graph)
  link1_2.attr('body', { strokeWidth: 4 })
  link1_2.appendLabel({
    attrs: {
      text: {
        text: 'to the',
        fontSize: fontSize,
      },
    },
  })
  link1_2.router('orthogonal')
  link1_2.connector('straight', { cornerType: 'line' })

  const link2_3 = new shapes.standard.Link()
  link2_3.source(rect2)
  link2_3.target(rect3)
  link2_3.addTo(graph)
  link2_3.appendLabel({
    attrs: {
      text: {
        text: 'I can',
        fontSize: fontSize,
      },
    },
  })
  link2_3.router('rightAngle', {
    margin: 10,
    sourceDirection: routers.rightAngle.Directions.BOTTOM,
    targetDirection: routers.rightAngle.Directions.TOP,
  })
  link2_3.connector('straight', { cornerType: 'line' })

  const link3_4 = new shapes.standard.Link()
  link3_4.source(rect3)
  link3_4.target(promptShape)
  link3_4.addTo(graph)
  link3_4.appendLabel({
    attrs: {
      text: {
        text: 'Try me here!',
        fontSize: fontSize,
      },
    },
  })
  link3_4.router('rightAngle', {
    margin: 25,
    sourceDirection: routers.rightAngle.Directions.BOTTOM,
    targetDirection: routers.rightAngle.Directions.BOTTOM,
  })
  link3_4.connector('straight', { cornerType: 'line' })

  paper.transformToFitContent({ padding: 100 })

  return { paper, graph }
}
