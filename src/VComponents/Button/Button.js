import VComponent from '../VComponent';

const option = {
  name: 'button',
};

class Button extends VComponent {
  constructor(context) {
    super(context, option);
  }

  import(path) {
    const instance = this.createSymbolInstanceByPath(path);

    this.addLayers([instance]);

    this.layer.select();
  }
}

export default Button;
