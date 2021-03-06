import SketchComponent from '../SketchComponent';
import { isOverridePointName } from '../../utils';

const option = {
  name: 'longInput',
};

class LongInput extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ status = 'normal', content, width, height, placeholder = 'placeholder' }) {
    const path = content ? `longInput/${status}` : 'longInput/placeholder';

    const instance = this.getInstanceByPath(path);
    const icon = this.getInstanceByPath('icon_drag');
    this.document.sketchObject.addLayer(instance);

    instance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'content')) {
        instance.setValue_forOverridePoint(content, overridePoint);
      }
      if (isOverridePointName(overridePoint, 'placeholder')) {
        instance.setValue_forOverridePoint(placeholder, overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon_drag')) {
        instance.setValue_forOverridePoint(icon.symbolID(), overridePoint);
      }
    });

    if (width) {
      instance.frame().setWidth_(width);
    }

    if (height) {
      instance.frame().setHeight_(height);
    }

    return instance;
  }
}

export default LongInput;
