import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer, is, isOverridePointName } from '../../utils';

const option = {
  name: 'radio',
};

class Radio extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ options, option: optionValue }) {
    const { page } = this;

    const radioGroup = page.newGroup({ name: 'radio' });
    const radioInstance = this.createSymbolInstanceByPath('radio/normal');
    const iconInstance = this.createSymbolInstanceByPath('icon/radio');
    const iconSelectedInstance = this.createSymbolInstanceByPath('icon/radio_selected');
    const { height } = getRectOfNativeLayer(radioInstance);

    const radioInstances = options.map(() => radioInstance.copy());
    radioGroup.sketchObject.addLayers(radioInstances);
    radioInstances.forEach((item, index) => {
      item.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, 'option')) {
          item.setValue_forOverridePoint_(String(options[index].value), overridePoint);
        }
        if (isOverridePointName(overridePoint, 'icon_status')) {
          const symbolID =
            options[index].value === optionValue
              ? iconSelectedInstance.symbolID()
              : iconInstance.symbolID();
          item.setValue_forOverridePoint_(symbolID, overridePoint);
        }
      });
    });

    radioInstances.forEach((radioItem, index) => {
      radioItem.frame().setY_((height + 10) * index);
      index += 1;
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
