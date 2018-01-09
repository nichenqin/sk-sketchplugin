import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer, isOverridePointName } from '../../utils/index';

const option = {
  name: 'checkbox',
};

class Checkbox extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ options = [], selectedOptions = [], isCol }) {
    const { page, name } = this;

    const checkboxGroup = page.newGroup({ name });

    const checkboxInstance = this.createSymbolInstanceByPath('checkbox/normal');
    const icon = this.createSymbolInstanceByPath('icon/checkbox');
    const iconSelected = this.createSymbolInstanceByPath('icon/checkbox_selected');
    const { width, height } = getRectOfNativeLayer(checkboxInstance);

    const checkboxInstances = options.map(() => checkboxInstance.copy());
    checkboxGroup.sketchObject.addLayers(checkboxInstances);

    checkboxInstances.forEach((item, index) => {
      item.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, 'option')) {
          item.setValue_forOverridePoint_(String(options[index].value), overridePoint);
        }
        if (isOverridePointName(overridePoint, 'icon_status')) {
          const symbolID = selectedOptions.includes(options[index].value)
            ? iconSelected.symbolID()
            : icon.symbolID();
          item.setValue_forOverridePoint_(symbolID, overridePoint);
        }
      });
    });

    checkboxInstances.forEach((radioItem, index) => {
      if (isCol) {
        radioItem.frame().setY_((height + 10) * index);
      } else {
        radioItem.frame().setX_((width + 10) * index);
      }
      index += 1;
    });

    checkboxGroup.adjustToFit();
    this.createBgAtGroup(checkboxGroup);
    checkboxGroup.iterate(layer => {
      layer.sketchObject.setIsLocked(true);
    });

    return checkboxGroup;
  }
}

export default Checkbox;
