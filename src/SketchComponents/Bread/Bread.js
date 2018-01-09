import SketchComponent from '../SketchComponent';
import { isOverridePointName, generatePath } from '../../utils';

const option = {
  name: 'bread',
};

class Bread extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ paths, showIcon }) {
    const levels = paths.length;
    const path = generatePath('bread', showIcon ? 'Icon' : '', `level_${levels}`);
    const instance = this.createSymbolInstanceByPath(path);
    this.document.sketchObject.addLayer(instance);

    const overridePoints = instance.overridePoints();
    overridePoints.forEach((overridePoint, index) => {
      if (isOverridePointName(overridePoint, 'icon_home')) {
        const icon = this.createSymbolInstanceByPath('icon/home');
        instance.setValue_forOverridePoint(icon.symbolID(), overridePoint);
      }
      if (isOverridePointName(overridePoint, `path_${index + 1}`)) {
        instance.setValue_forOverridePoint(paths[index].value, overridePoint);
      }
    });

    return instance;
  }
}

export default Bread;
