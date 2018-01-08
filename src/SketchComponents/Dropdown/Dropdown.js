import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer, isOverridePointName } from '../../utils/index';

const option = {
  name: 'dropdown',
};

class Dropdown extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ showPicker, showSearch, searchWord }) {
    const { page, name } = this;
    const root = page.newGroup({ name });
    const dropdownGroup = root.newGroup({ name });

    const searchInstance = this.createSymbolInstanceByPath('dropdown/search/normal');
    const optionInstance = this.createSymbolInstanceByPath('dropdown/option/normal');
    const selectionInstance = this.createSymbolInstanceByPath('icon/none');
    const { height } = getRectOfNativeLayer(optionInstance);

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
    optionInstances.forEach((optionItem, index) => {
      optionItem.frame().setY_(height * index + dropdownGroup.frame.height);
      optionItem.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, 'icon_selection')) {
          optionItem.setValue_forOverridePoint_(selectionInstance.symbolID(), overridePoint);
        }
      });
    });

    dropdownGroup.adjustToFit();
    this.createBgAtGroup(dropdownGroup);
    this.createShadowAtGroup(dropdownGroup);

    root.adjustToFit();

    return dropdownGroup;
  }
}

export default Dropdown;
