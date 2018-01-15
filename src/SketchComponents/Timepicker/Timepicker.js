import SketchComponent from '../SketchComponent';
import Picker from '../Picker';
import { setFrame, generatePath, setAlignment } from '../../utils/index';

const option = {
  name: 'timepicker',
};

class Timepicker extends SketchComponent {
  constructor(context, payload = {}) {
    super(context, payload, option);
  }

  import({
    showSeconds, timeType, showNow, showClear, timepickerAlign, picker = {},
  }) {
    const { context, page, name } = this;

    const rootGroup = page.newGroup({ name });

    let pickerInstance;
    if (picker.show) {
      const pickerComponent = new Picker(context, {
        type: 'time',
        status: 'active',
        icon: 'time/active',
        content: picker.time,
        placeholder: picker.placeholder,
      });
      pickerInstance = pickerComponent.moveToGroup(rootGroup);
      rootGroup.adjustToFit();
    }

    const seconds = showSeconds ? 'second' : '';
    const format = timeType === 12 ? '12h' : '';
    const timepickerPath = generatePath('timepicker', 'body', format, seconds);

    const timepickerInstance = this.getInstanceByPath(timepickerPath);
    const timepickerGroup = rootGroup.newGroup({ name });
    timepickerGroup.sketchObject.addLayer(timepickerInstance);

    timepickerGroup.adjustToFit();
    setFrame(timepickerGroup, { y: rootGroup.frame.height + 10 });

    if (showNow || showClear) {
      const now = showNow ? 'now' : '';
      const clear = showClear ? 'clear' : '';
      const footerPath = generatePath('timepicker', 'footer', now, clear);
      const footerInstance = this.getInstanceByPath(footerPath);
      timepickerGroup.sketchObject.addLayer(footerInstance);
      footerInstance.frame().setY_(timepickerGroup.frame.height);
      footerInstance.frame().setWidth_(timepickerGroup.frame.width);
      timepickerGroup.adjustToFit();
    }

    if (picker.show) setAlignment(timepickerGroup, pickerInstance, timepickerAlign);
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
