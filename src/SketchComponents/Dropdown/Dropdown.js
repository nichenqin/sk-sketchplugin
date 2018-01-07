import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer, isOverridePointName } from '../../utils/index';

const option = {
  name: 'dropdown',
};

class Dropdown extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import() {
    const { page, name } = this;
    const dropdownGroup = page.newGroup({ name });

    const searchInstance = this.createSymbolInstanceByPath('dropdown/search/normal');
    const optionInstance = this.createSymbolInstanceByPath('dropdown/option/normal');
    const selectionInstance = this.createSymbolInstanceByPath('icon/none');
    const { height } = getRectOfNativeLayer(optionInstance);

    dropdownGroup.sketchObject.addLayer(searchInstance);
    dropdownGroup.adjustToFit();

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

    return dropdownGroup;
  }
}

export default Dropdown;
