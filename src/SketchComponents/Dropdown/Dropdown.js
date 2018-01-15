import SketchComponent from '../SketchComponent';
import Picker from '../Picker';
import { isOverridePointName, setFrame, setAlignment } from '../../utils/index';

const option = {
  name: 'dropdown',
};

class Dropdown extends SketchComponent {
  constructor(context, payload = { showPicker: false, showSearch: false }) {
    super(context, payload, option);
  }

  import({ showPicker = false, showSearch = false, searchWord, dropdownAlign }) {
    const { page, name, context, sketch } = this;

    const rootGroup = page.newGroup({
      name,
      frame: new sketch.Rectangle(0, 0, 0.5, 0.5),
    });

    let pickerInstance;
    if (showPicker) {
      const picker = new Picker(context);
      pickerInstance = picker.moveToGroup(rootGroup);
      rootGroup.adjustToFit();
    }

    const dropdownGroup = rootGroup.newGroup({
      name,
      frame: new sketch.Rectangle(0, 0, 0.5, 0.5),
    });
    const searchInstance = this.getInstanceByPath('dropdown/search/normal');
    const optionInstance = this.getInstanceByPath('dropdown/option/normal');
    const selectionInstance = this.getInstanceByPath('icon/none');

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

    if (showPicker) setAlignment(dropdownGroup, pickerInstance, dropdownAlign);
    this.createBgAtGroup(dropdownGroup);
    this.createShadowAtGroup(dropdownGroup);
    setFrame(dropdownGroup, { y: rootGroup.frame.height });

    rootGroup.adjustToFit();
    rootGroup.iterate(layer => {
      layer.sketchObject.setIsLocked_(true);
    });

    return rootGroup;
  }
}

export default Dropdown;
