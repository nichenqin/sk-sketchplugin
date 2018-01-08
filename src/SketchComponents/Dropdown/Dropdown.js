import SketchComponent from '../SketchComponent';
import Picker from '../Picker';
import { getRectOfNativeLayer, isOverridePointName, setFrame } from '../../utils/index';

const option = {
  name: 'dropdown',
};

class Dropdown extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ showPicker, showSearch, searchWord }) {
    const {
      page, name, context, sketch,
    } = this;

    const rootGroup = page.newGroup({
      name,
      frame: new sketch.Rectangle(0, 0, 0.5, 0.5),
    });

    let pickerInstance;
    if (showPicker) {
      const picker = new Picker(context);
      pickerInstance = picker.layer.sketchObject;
      rootGroup.sketchObject.addLayer(pickerInstance.copy());
      page.sketchObject.removeLayer_(pickerInstance);
      rootGroup.adjustToFit();
    }

    const dropdownGroup = rootGroup.newGroup({
      name,
      frame: new sketch.Rectangle(0, 0, 0.5, 0.5),
    });
    const searchInstance = this.createSymbolInstanceByPath('dropdown/search/normal');
    const optionInstance = this.createSymbolInstanceByPath('dropdown/option/normal');
    const selectionInstance = this.createSymbolInstanceByPath('icon/none');

    if (showSearch) {
      dropdownGroup.sketchObject.addLayer(searchInstance);
      searchInstance.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, 'content')) {
          searchInstance.setValue_forOverridePoint_(String(searchWord), overridePoint);
        }
      });

      dropdownGroup.adjustToFit();
    }

    const optionInstances = [...new Array(3)].map(() => optionInstance.copy());
    dropdownGroup.sketchObject.addLayers(optionInstances);
    optionInstances.forEach(optionItem => {
      optionItem.frame().setY_(dropdownGroup.frame.height);
      optionItem.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, 'icon_selection')) {
          optionItem.setValue_forOverridePoint_(selectionInstance.symbolID(), overridePoint);
        }
      });
      dropdownGroup.adjustToFit();
    });

    dropdownGroup.adjustToFit();
    this.createBgAtGroup(dropdownGroup);
    this.createShadowAtGroup(dropdownGroup);
    setFrame(dropdownGroup, { y: rootGroup.frame.height });

    rootGroup.adjustToFit();

    return rootGroup;
  }
}

export default Dropdown;
