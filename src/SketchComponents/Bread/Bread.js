import SketchComponent from '../SketchComponent';
import { isOverridePointName } from '../../utils';

const option = {
  name: 'bread',
};

class Bread extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ paths }) {
    const levels = paths.length;
    const path = `bread/level_${levels}`;
    const instance = this.createSymbolInstanceByPath(path);
    this.document.sketchObject.addLayer(instance);

    const overridePoints = instance.overridePoints();
    overridePoints.forEach((overridePoint, index) => {
      if (isOverridePointName(overridePoint, `path_${index + 1}`)) {
        instance.setValue_forOverridePoint(paths[index].value, overridePoint);
      }
    });

    return instance;
  }
}

export default Bread;
