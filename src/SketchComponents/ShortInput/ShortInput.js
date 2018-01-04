import SketchComponent from '../SketchComponent';
import { isOverridePointName } from '../../utils';

const option = {
  name: 'shortInput',
};

class ShortInput extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({
    path, unit, content, placeholder, width,
  }) {
    const instance = this.createSymbolInstanceByPath(path);
    this.document.sketchObject.addLayer(instance);

    instance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'content')) {
        instance.setValue_forOverridePoint_(content, overridePoint);
      }
      if (isOverridePointName(overridePoint, 'unit')) {
        instance.setValue_forOverridePoint_(unit, overridePoint);
      }
      if (isOverridePointName(overridePoint, 'placeholder')) {
        instance.setValue_forOverridePoint_(placeholder, overridePoint);
      }
    });

    if (width) {
      instance.frame().setWidth_(width);
    }

    return instance;
  }
}

export default ShortInput;
