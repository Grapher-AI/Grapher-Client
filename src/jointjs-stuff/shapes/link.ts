import {shapes, util} from "@joint/core";

// const defaultLabelMarkup = util.svg/* xml */`
//     <rect @selector="body"/>
//     <text @selector="label"/>
// `;

export class DefaultLink extends shapes.standard.Link {

  defaults() {
    return util.defaultsDeep({
      type: 'customShape.defaultLink',
      // defaultLabel: {
      //   markup: defaultLabelMarkup,
      //   attrs: {
      //     label: {
      //       text: 'Yes/No/Switch?',
      //       fill: 'black', // default text color
      //       fontSize: 12,
      //       textAnchor: 'middle',
      //       yAlignment: 'middle',
      //       pointerEvents: 'none',
      //     },
      //     body: {
      //       ref: 'label',
      //       fill: 'white',
      //       stroke: 'cornflowerblue',
      //       strokeWidth: 2,
      //       width: 'calc(1.2*w)',
      //       height: 'calc(1.2*h)',
      //       x: 'calc(x-calc(0.1*w))',
      //       y: 'calc(y-calc(0.1*h))'
      //     }
      //   },
      // position: {
      //   distance: 100, // default absolute position
      //   args: {
      //     absoluteDistance: true
      //   }
      // }
      // },
      // attrs: {
      //   line: {
      //     stroke: 'cornflowerblue',
      //     strokeWidth: 5,
      //     targetMarker: {
      //       'type': 'rect',
      //       'width': 10,
      //       'height': 20,
      //       'y': -10,
      //       'stroke': 'none'
      //     }
      //   }
      // },
    }, super.defaults);
  }
};
