import SketchComponent from '../SketchComponent';
import { isOverridePointName } from '../../utils';

const option = {
  name: 'button',
};

class Button extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ path }) {
    const button = this.createSymbolInstanceByPath(path);
    this.document.sketchObject.addLayer(button);

    button.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'text')) {
        button.setValue_forOverridePoint_('test!!', overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon')) {
        const icon = this.createSymbolInstanceByPath('icon/camera_large');
        button.setValue_forOverridePoint_(icon.symbolID(), overridePoint);
      }
    });

    return button;
  }
}

export default Button;
