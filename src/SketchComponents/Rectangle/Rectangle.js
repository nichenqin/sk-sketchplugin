import SketchComponent from '../SketchComponent';

const option = {
  name: 'rectangle',
};

class Rectangle extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({
    width, height, name = 'rectangle', backgroundColor = '#D8D8D8', borderColor = '#979797',
  }) {
    const { page, sketch } = this;
    const style = new sketch.Style();
    style.fills = [backgroundColor];
    style.borders = [borderColor];

    const shape = page.newShape({
      frame: new sketch.Rectangle(0, 0, width, height),
      name,
      style,
    });

    return shape;
  }
}

export default Rectangle;
