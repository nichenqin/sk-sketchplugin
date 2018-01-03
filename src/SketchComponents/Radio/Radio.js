import SketchComponent from '../SketchComponent';
import { getRectOfNativeLayer, is, setFrame, isOverridePointName } from '../../utils';

const option = {
  name: 'radio',
};

class Radio extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ options }) {
    const { page } = this;

    const radioGroup = page.newGroup({ name: 'radio' });
    const radioItem = this.createSymbolInstanceByPath('radio/normal');
    const icon = this.createSymbolInstanceByPath('icon/radio');
    const { height } = getRectOfNativeLayer(radioItem);

    const itemInstances = options.map(() => radioItem.copy());
    radioGroup.sketchObject.addLayers(itemInstances);
    itemInstances.forEach((item, index) => {
      item.overridePoints().forEach(overridePoint => {
        if (isOverridePointName(overridePoint, 'option')) {
          item.setValue_forOverridePoint_(options[index].value, overridePoint);
        }
        if (isOverridePointName(overridePoint, 'icon_status')) {
          item.setValue_forOverridePoint_(icon.symbolID(), overridePoint);
        }
      });
    });

    let index = 0;
    radioGroup.iterate(item => {
      if (is(item.sketchObject, 'MSSymbolInstance')) {
        item.sketchObject.frame().setY_(height * index);
        index += 1;
      }
    });

    radioGroup.adjustToFit();

    return radioGroup;
  }
}

export default Radio;
