import SketchComponent from '../SketchComponent';
import { generatePath } from '../../utils';

const option = {
  name: 'switch',
};

class Switch extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ isOn, disabled }) {
    const status = isOn ? 'on' : 'off';
    // TODO: rename
    const defaultDisabled = disabled && isOn ? '*default/disable' : 'disable';
    const disabledStr = disabled ? defaultDisabled : status;
    const path = generatePath('switch', disabledStr);

    const instance = this.getInstanceByPath(path);
    this.document.sketchObject.addLayer(instance);

    return instance;
  }
}

export default Switch;
