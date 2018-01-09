import SketchComponent from '../SketchComponent';
import Picker from '../Picker';
import { getRectOfNativeLayer, setFrame } from '../../utils/index';

const option = {
  name: 'timepicker',
};

class Timepicker extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ showPicker, showSeconds, timeType }) {
    const { context, page, name } = this;

    const rootGroup = page.newGroup({ name });

    let pickerWidth = 0;
    if (showPicker) {
      const picker = new Picker(context);
      const pickerInstance = picker.layer.sketchObject;
      rootGroup.sketchObject.addLayer(pickerInstance.copy());
      page.sketchObject.removeLayer(pickerInstance);
      rootGroup.adjustToFit();
      pickerWidth = getRectOfNativeLayer(pickerInstance).width;
    }

    const seconds = showSeconds ? 'second' : '';
    const format = timeType === 12 ? '12h' : '';
    const path = ['timepicker', 'body', format, seconds].filter(p => !!p).join('/');

    const timepickerInstance = this.createSymbolInstanceByPath(path);
    const timepickerGroup = rootGroup.newGroup({ name });
    timepickerGroup.sketchObject.addLayer(timepickerInstance);

    const { width: timepickerWidth } = getRectOfNativeLayer(timepickerInstance);
    const padding = pickerWidth ? (pickerWidth - timepickerWidth) / 2 : 0;
    timepickerInstance.frame().setX_(padding);

    timepickerGroup.adjustToFit();
    setFrame(timepickerGroup, { y: rootGroup.frame.height });
    this.createBgAtGroup(timepickerGroup);
    this.createShadowAtGroup(timepickerGroup);

    rootGroup.adjustToFit();
    rootGroup.iterate(layer => {
      layer.sketchObject.setIsLocked_(true);
    });

    return rootGroup;
  }
}

export default Timepicker;
