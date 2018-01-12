import SketchComponent from '../SketchComponent';
import Tips from '../Tips';
import { isOverridePointName, generatePath } from '../../utils';

const option = {
  name: 'shortInput',
};

class ShortInput extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({
    status, type, unit, content, placeholder, width, isVisible, tips = {},
  }) {
    const { context, page, name } = this;
    const inputGroup = page.newGroup({ name });

    const passwordStr = type === 'password' ? 'password' : '';
    const unitStr = unit ? 'unit' : '';
    const statusStr = content ? status : 'placeholder';

    const path = generatePath(name, passwordStr || unitStr, statusStr);

    const instance = this.getInstanceByPath(path);
    inputGroup.sketchObject.addLayer(instance);

    instance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'content')) {
        const contentStr = isVisible ? '**********' : String(content);
        instance.setValue_forOverridePoint_(contentStr, overridePoint);
      }
      if (isOverridePointName(overridePoint, 'unit')) {
        instance.setValue_forOverridePoint_(String(unit), overridePoint);
      }
      // TODO: icon 命名
      if (isOverridePointName(overridePoint, 'icon/visible')) {
        const iconPath = isVisible ? 'icon/visible' : 'icon/invisible';
        const icon = this.getInstanceByPath(iconPath);
        instance.setValue_forOverridePoint_(icon.symbolID(), overridePoint);
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
