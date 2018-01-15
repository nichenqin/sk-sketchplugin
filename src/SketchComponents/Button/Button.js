import SketchComponent from '../SketchComponent';
import Dropdown from '../Dropdown';
import Tips from '../Tips';
import { isOverridePointName, generatePath } from '../../utils';

const option = {
  name: 'button',
};

class Button extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  replaceWithPath(path) {
    if (path === this.payload.path) return;
    const button = this.layer.sketchObject;
    const newButton = this.getInstanceByPath(path);
    button.replaceWithInstanceOfSymbol(newButton);
  }

  updateText(text) {
    const button = this.layer.sketchObject;

    button.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'text')) {
        button.setValue_forOverridePoint_(String(text), overridePoint);
      }
    });
  }

  import({
    text, type, status, icon = 'camera_large', tips = {}, dropdown = {},
  }) {
    const { context, page, name } = this;

    const buttonGroup = page.newGroup({ name });

    const path = generatePath(name, type, status);
    const buttonInstance = this.getInstanceByPath(path);
    buttonGroup.sketchObject.addLayer(buttonInstance);

    buttonInstance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'text')) {
        buttonInstance.setValue_forOverridePoint_(String(text), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon')) {
        const iconInstance = this.getInstanceByPath(`icon/${icon}`);
        buttonInstance.setValue_forOverridePoint_(iconInstance.symbolID(), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon/arroweDown')) {
        // TODO: arroweDown
        const iconInstance = this.getInstanceByPath('icon/arrowDown');
        buttonInstance.setValue_forOverridePoint_(iconInstance.symbolID(), overridePoint);
      }
    });

    buttonGroup.adjustToFit();

    if (type === 'menu' && dropdown.show) {
      const dropdownInstance = new Dropdown(context, { showPicker: false });
      dropdownInstance.moveToGroup(buttonGroup);
      dropdownInstance.sketchObject.frame().setY_(buttonGroup.frame.height + 10);
      buttonGroup.adjustToFit();
    }

    if (tips.show) {
      const tipsComponent = new Tips(context, { content: tips.content, direction: tips.direction });
      tipsComponent.moveToGroup(buttonGroup);
      tipsComponent.setPosition(buttonInstance);
    }

    return buttonGroup;
  }
}

export default Button;
