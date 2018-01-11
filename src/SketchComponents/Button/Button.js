import SketchComponent from '../SketchComponent';
import { isOverridePointName } from '../../utils';

const option = {
  name: 'button',
};

class Button extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  replaceWithPath(path) {
    if (path === this.payload.path) return;
    const button = this.layer.sketchObject;
    const newButton = this.getInstanceByPath(path);
    button.replaceWithInstanceOfSymbol(newButton);
  }

  updateText(text) {
    const button = this.layer.sketchObject;

    button.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'text')) {
        button.setValue_forOverridePoint_(String(text), overridePoint);
      }
    });
  }

  import({ text, path, iconPath = 'icon/camera_large' }) {
    const button = this.getInstanceByPath(path);
    this.document.sketchObject.addLayer(button);

    button.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'text')) {
        button.setValue_forOverridePoint_(String(text), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon')) {
        const icon = this.getInstanceByPath(iconPath);
        button.setValue_forOverridePoint_(icon.symbolID(), overridePoint);
      }
    });

    return button;
  }
}

export default Button;
