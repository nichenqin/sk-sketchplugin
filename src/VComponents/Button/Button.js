import VComponent from '../VComponent';
import { is } from '../../utils';

const option = {
  name: 'button',
};

class Button extends VComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ path, text }) {
    const instance = this.createSymbolInstanceByPath(path);
    this.addLayers([instance]);

    const btnGroup = instance.detachByReplacingWithGroup();
    btnGroup.children().forEach(layer => {
      if (is(layer, 'MSTextLayer')) {
        layer.stringValue = text;
      }
      if (is(layer, 'MSSymbolInstance')) {
        const icon = this.createSymbolInstanceByPath('icon/camera_large');
        layer.replaceWithInstanceOfSymbol(icon);
      }
    });

    return btnGroup;
  }
}

export default Button;
