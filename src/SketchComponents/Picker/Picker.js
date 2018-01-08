import SketchComponent from '../SketchComponent';
import { isOverridePointName } from '../../utils';

const option = {
  name: 'picker',
};

class Picker extends SketchComponent {
  constructor(context, payload = { content: 'default', status: 'active' }) {
    super(context, payload, option);
  }

  import({ content, status }) {
    const pickerInstance = this.createSymbolInstanceByPath(`picker/${status}`);
    this.document.sketchObject.addLayer(pickerInstance);

    pickerInstance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'content') && content) {
        pickerInstance.setValue_forOverridePoint_(String(content), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon_arrow')) {
        const iconStatuc = status === 'active' ? 'arrowUp' : 'arrowDown';
        const icon = this.createSymbolInstanceByPath(`icon/${iconStatuc}`);
        pickerInstance.setValue_forOverridePoint_(icon.symbolID(), overridePoint);
      }
    });

    return pickerInstance;
  }
}

export default Picker;
