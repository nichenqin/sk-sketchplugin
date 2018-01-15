import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer, isOverridePointName } from '../../utils';

const option = {
  name: 'radio',
};

class Radio extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ options, option: optionValue, isCol }) {
    const { page, name } = this;

    const radioGroup = page.newGroup({ name });
    const radioInstance = this.getInstanceByPath('radio/normal');
    const iconInstance = this.getInstanceByPath('icon/radio/normal');
    const iconSelectedInstance = this.getInstanceByPath('icon/radio/selected');
    const { width, height } = getRectOfNativeLayer(radioInstance);

    const radioInstances = options.map(() => radioInstance.copy());
    radioGroup.sketchObject.addLayers(radioInstances);
    radioInstances.forEach((item, index) => {
      item.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, 'option')) {
          item.setValue_forOverridePoint_(String(options[index].value), overridePoint);
        }
        if (isOverridePointName(overridePoint, 'icon_status')) {
          const icon = options[index].value === optionValue ? iconSelectedInstance : iconInstance;
          item.setValue_forOverridePoint_(icon.symbolID(), overridePoint);
        }
      });
    });

    radioInstances.forEach((radioItem, index) => {
      if (isCol) {
        radioItem.frame().setY_((height + 10) * index);
      } else {
        radioItem.frame().setX_((width + 10) * index);
      }
    });

    radioGroup.adjustToFit();
    this.createBgAtGroup(radioGroup);
    radioGroup.iterate(layer => {
      layer.sketchObject.setIsLocked(true);
    });

    return radioGroup;
  }
}

export default Radio;
