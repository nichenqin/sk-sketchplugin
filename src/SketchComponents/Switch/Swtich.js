import SketchComponent from '../SketchComponent';

const option = {
  name: 'switch',
};

class Switch extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ path }) {
    console.log(path);
    const instance = this.createSymbolInstanceByPath(path);
    console.log(instance);
    this.document.sketchObject.addLayer(instance);

    return instance;
  }
}

export default Switch;
