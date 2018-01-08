import SketchComponent from '../SketchComponent';
import Picker from '../Picker';

const option = {
  name: 'timepicker',
};

class Timepicker extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ showPicker }) {
    const { context, page, name } = this;

    const rootGroup = page.newGroup({ name });

    if (showPicker) {
      const picker = new Picker(context);
      const pickerInstance = picker.layer.sketchObject;
      rootGroup.sketchObject.addLayer(pickerInstance.copy());
      page.sketchObject.removeLayer(pickerInstance);
      rootGroup.adjustToFit();
    }

    const timepickerInstance = this.createSymbolInstanceByPath('timepicker/body');
    const timepickerGroup = rootGroup.newGroup({ name });
    timepickerGroup.sketchObject.addLayer(timepickerInstance);

    timepickerGroup.adjustToFit();
    this.createBgAtGroup(timepickerGroup);
    this.createShadowAtGroup(timepickerGroup);

    rootGroup.adjustToFit();

    return rootGroup;
  }
}

export default Timepicker;
