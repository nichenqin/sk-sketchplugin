import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer, is } from '../../utils';

const option = {
  name: 'radio',
};

class Radio extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ options }) {
    const { page } = this;

    const radioGroup = page.newGroup({ name: 'radio' });
    const radioItem = this.createSymbolInstanceByPath('radio/normal');
    const { height } = getRectOfNativeLayer(radioItem);

    const instances = options.map(() => radioItem.copy());
    radioGroup.sketchObject.addLayers(instances);

    let index = 0;
    radioGroup.iterate(layer => {
      if (is(layer.sketchObject, 'MSSymbolInstance')) {
        layer.sketchObject.frame().setY_(height * index);
        index += 1;
      }
    });

    radioGroup.iterate(layer => {
      layer.sketchObject.detachByReplacingWithGroup();
    });

    radioGroup.adjustToFit();

    return radioGroup;
  }
}

export default Radio;
