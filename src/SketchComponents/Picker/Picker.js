import SketchComponent from '../SketchComponent';
import { isOverridePointName } from '../../utils';

const option = {
  name: 'picker',
};

class Picker extends SketchComponent {
  constructor(context, payload = { content: 'default', icon: 'arrowUp', status: 'active' }) {
    super(context, payload, option);
  }

  import({
    content, icon = 'arrowDown', status = 'normal', placeholder = 'default placeholder',
  }) {
    const path = content ? `picker/${status}` : 'picker/placeholder';

    const pickerInstance = this.createSymbolInstanceByPath(path);
    this.document.sketchObject.addLayer(pickerInstance);

    pickerInstance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'content') && content) {
        pickerInstance.setValue_forOverridePoint_(String(content), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'placeholder') && !content) {
        pickerInstance.setValue_forOverridePoint_(String(placeholder), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon_arrow')) {
        const iconInstance = this.createSymbolInstanceByPath(`icon/${icon}`);
        pickerInstance.setValue_forOverridePoint_(iconInstance.symbolID(), overridePoint);
      }
    });

    return pickerInstance;
  }
}

export default Picker;
