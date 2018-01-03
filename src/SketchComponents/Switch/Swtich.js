import SketchComponent from '../SketchComponent';

const option = {
  name: 'switch',
};

class Switch extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ path }) {
    const instance = this.createSymbolInstanceByPath(path);
    this.document.sketchObject.addLayer(instance);

    return instance;
  }
}

export default Switch;
