import { dia, util } from '@joint/core'

const markup = util.svg/* xml */ `
    <ellipse @selector="body"/>
    <text @selector="label"/>
`
export class BeginShape extends dia.Element {
  preinitialize() {
    this.markup = markup
  }

  defaults() {
    return {
      ...super.defaults,
      type: 'customShapes.Begin',
      size: { width: 100, height: 100 },
      attrs: {
        body: {
          // overflow: 'visible',
          cx: 'calc(0.5*w)',
          cy: 'calc(0.5*h)',
          rx: 'calc(0.5*w)',
          ry: 'calc(0.5*h)',
          width: 'calc(w)',
          height: 'calc(h)',
          strokeWidth: 2,
          stroke: '#333333',
          fill: '#ffeeb8',
        },
        label: {
          text: 'Begin',
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
