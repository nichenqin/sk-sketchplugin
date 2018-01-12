import SketchComponent from '../SketchComponent';
import Tips from '../Tips';
import { isOverridePointName } from '../../utils';

const option = {
  name: 'shortInput',
};

class ShortInput extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({
    path, unit, content, placeholder, width, tips = {},
  }) {
    const { context, page, name } = this;

    const inputGroup = page.newGroup({ name });

    const instance = this.getInstanceByPath(path);
    inputGroup.sketchObject.addLayer(instance);

    instance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'content')) {
        instance.setValue_forOverridePoint_(String(content), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'unit')) {
        instance.setValue_forOverridePoint_(String(unit), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'placeholder')) {
        instance.setValue_forOverridePoint_(String(placeholder), overridePoint);
      }
    });

    if (width) {
      instance.frame().setWidth_(width);
    }

    inputGroup.adjustToFit();

    if (tips.show) {
      const tipsComponent = new Tips(context, { content: tips.content, direction: tips.direction });
      tipsComponent.moveToGroup(inputGroup);
      tipsComponent.setPosition(inputGroup);
    }

    return inputGroup;
  }
}

export default ShortInput;
