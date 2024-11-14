import {dia, util} from '@joint/core';

const markup = util.svg/* xml */`
    <foreignObject @selector="foreignObject"/>
`;
export class PromptShape extends dia.Element {
  preinitialize() {
    this.markup = markup;
  }

  public applyForeign?: (htmlElement: HTMLElement) => void

  defaults() {
    return {
      ...super.defaults,
      type: 'customShapes.PromptShape',
      size: { width: 100, height: 80 },
      attrs: {
        foreignObject: {
          overflow: 'visible',
          cx: 'calc(0.5*w)',
          cy: 'calc(0.5*h)',
          rx: 'calc(0.5*w)',
          ry: 'calc(0.5*h)',
          width: 'calc(w)',
          height: 'calc(h)',
          strokeWidth: 2,
          stroke: '#333333',
          fill: '#FFFFFF'
        },
        label: {
          textVerticalAnchor: 'middle',
          textAnchor: 'middle',
          x: 'calc(0.5*w)',
          y: 'calc(0.5*h)',
          fontSize: 14,
          fill: '#333333'
        }
      }
    };
  }
}

export class PromptShapeView extends dia.ElementView {
  render(): this {
    super.renderMarkup();
    const model = this.model as PromptShape;

    const foreignObject = this.el.querySelector('foreignObject')

    model.applyForeign = (htmlElement: HTMLElement)=>{
      if(!foreignObject) throw new Error('ForeignObject not found');
      foreignObject.append(htmlElement);
    }

    return  this;
  }
}
