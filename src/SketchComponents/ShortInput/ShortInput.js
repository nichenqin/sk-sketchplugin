import SketchComponent from '../SketchComponent';

const option = {
  name: 'shortInput',
};

class ShortInput extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ path }) {
    const instance = this.createSymbolInstanceByPath(path);
    this.document.sketchObject.addLayer(instance);

    return instance;
  }
}

export default ShortInput;
