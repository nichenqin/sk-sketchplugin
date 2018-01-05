import SketchComponent from '../SketchComponent';

const option = {
  name: 'switch',
};

class Switch extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ isOn, disabled }) {
    const status = isOn ? 'on' : 'off';
    const path = `switch/${disabled ? 'disable' : status}`;

    const instance = this.createSymbolInstanceByPath(path);
    this.document.sketchObject.addLayer(instance);

    return instance;
  }
}

export default Switch;
