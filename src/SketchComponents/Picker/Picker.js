import SketchComponent from '../SketchComponent';
import { isOverridePointName } from '../../utils';

const option = {
  name: 'picker',
};

class Picker extends SketchComponent {
  constructor(context, payload = { content: 'default', status: 'normal' }) {
    super(context, payload, option);
  }

  import({ content }) {
    const pickerInstance = this.createSymbolInstanceByPath('picker/normal');
    this.document.sketchObject.addLayer(pickerInstance);

    pickerInstance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'content') && content) {
        pickerInstance.setValue_forOverridePoint_(String(content), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon_arrow')) {
        const icon = this.createSymbolInstanceByPath('icon/arrowDown');
        pickerInstance.setValue_forOverridePoint_(icon.symbolID(), overridePoint);
      }
    });

    return pickerInstance;
  }
}

export default Picker;
