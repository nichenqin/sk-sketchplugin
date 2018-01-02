import VComponent from '../VComponent';
import { is } from '../../utils';

const option = {
  name: 'button',
};

class Button extends VComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  iterateGroup(group) {
    const { text, iconPath = 'icon/camera_large' } = this.payload;

    group.iterateWithFilter('isText', textLayer => {
      textLayer.text = text;
    });

    group.sketchObject.children().forEach(layer => {
      if (is(layer, 'MSSymbolInstance')) {
        const icon = this.createSymbolInstanceByPath(iconPath);
        layer.replaceWithInstanceOfSymbol(icon);
      }
    });
  }

  componentDidSelected() {
    const { selection } = this;

    selection.iterateWithFilter('isGroup', group => {
      this.iterateGroup(group);
    });
  }

  import({ path }) {
    const instance = this.createSymbolInstanceByPath(path);
    this.addLayers([instance]);

    const btnGroup = instance.detachByReplacingWithGroup();

    return btnGroup;
  }
}

export default Button;
