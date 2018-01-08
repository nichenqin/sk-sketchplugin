import SketchComponent from '../SketchComponent';
import Picker from '../Picker';
import { getRectOfNativeLayer, isOverridePointName } from '../../utils/index';

const option = {
  name: 'dropdown',
};

class Dropdown extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ showPicker, showSearch, searchWord }) {
    const { page, name, context } = this;

    const rootGroup = page.newGroup({ name });

    let pickerInstance;
    if (showPicker) {
      const picker = new Picker(context);
      pickerInstance = picker.layer.sketchObject;
      rootGroup.sketchObject.addLayer(pickerInstance.copy());
      page.sketchObject.removeLayer_(pickerInstance);
      rootGroup.adjustToFit();
    }

    const dropdownGroup = rootGroup.newGroup({ name });
    const searchInstance = this.createSymbolInstanceByPath('dropdown/search/normal');
    const optionInstance = this.createSymbolInstanceByPath('dropdown/option/normal');
    const selectionInstance = this.createSymbolInstanceByPath('icon/none');
    const { height } = getRectOfNativeLayer(optionInstance);

    if (showSearch) {
      dropdownGroup.sketchObject.addLayer(searchInstance);
      searchInstance.frame().setY_(rootGroup.frame.height);
      searchInstance.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, 'content')) {
          searchInstance.setValue_forOverridePoint_(String(searchWord), overridePoint);
        }
      });
      dropdownGroup.adjustToFit();
    }

    const optionInstances = [...new Array(3)].map(() => optionInstance.copy());
    dropdownGroup.sketchObject.addLayers(optionInstances);
    optionInstances.forEach((optionItem, index) => {
      optionItem.frame().setY_(height * index + rootGroup.frame.height);
      optionItem.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, 'icon_selection')) {
          optionItem.setValue_forOverridePoint_(selectionInstance.symbolID(), overridePoint);
        }
      });
    });

    dropdownGroup.adjustToFit();
    this.createBgAtGroup(dropdownGroup);
    this.createShadowAtGroup(dropdownGroup);

    dropdownGroup.adjustToFit();
    rootGroup.adjustToFit();

    return rootGroup;
  }
}

export default Dropdown;
