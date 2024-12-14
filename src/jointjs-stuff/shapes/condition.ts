import { dia, util } from '@joint/core'

const markup = util.svg/* xml */ `
    <polygon @selector="body"/>
    <text @selector="label"/>
`
export class ConditionShape extends dia.Element {
  preinitialize() {
    this.markup = markup
  }

  defaults() {
    return {
      ...super.defaults,
      type: 'customShapes.Condition',
      size: { width: 100, height: 100 },
      attrs: {
        body: {
          // overflow: 'visible',
          // cx: 'calc(0.5*w)',
          // cy: 'calc(0.5*h)',
          // rx: 'calc(0.5*w)',
          // ry: 'calc(0.5*h)',
          points: 'calc(w/2),0 calc(w),calc(h/2) calc(w/2),calc(h) 0,calc(h/2)',
          width: 'calc(w)',
          height: 'calc(h)',
          strokeWidth: 2,
          stroke: '#333333',
          fill: '#ebeaff',
        },
        label: {
          text: 'Condition',
          textVerticalAnchor: 'middle',
          textAnchor: 'middle',
          x: 'calc(0.5*w)',
          y: 'calc(0.5*h)',
          fontSize: 14,
          fill: '#333333',
        },
      },
    }
  }
}
