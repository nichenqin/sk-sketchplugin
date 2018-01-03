import SketchComponent from '../SketchComponent';
import { isOverridePointName } from '../../utils';

const option = {
  name: 'button',
};

class Button extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ text, path, iconPath = 'icon/camera_large' }) {
    const button = this.createSymbolInstanceByPath(path);
    this.document.sketchObject.addLayer(button);

    button.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'text')) {
        button.setValue_forOverridePoint_(text, overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon')) {
        const icon = this.createSymbolInstanceByPath(iconPath);
        button.setValue_forOverridePoint_(icon.symbolID(), overridePoint);
      }
    });

    return button;
  }
}

export default Button;
