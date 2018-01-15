import SketchComponent from '../SketchComponent';
import { isOverridePointName, generatePath, createComponentInstance } from '../../utils';

const option = {
  name: 'picker',
};

class Picker extends SketchComponent {
  constructor(
    context,
    payload = {
      content: 'default',
      icon: 'arrowUp',
      status: 'active',
      placeholder: 'placeholder',
      type: '',
      relevant: '',
    },
  ) {
    super(context, payload, option);
  }

  import({
    content,
    icon = 'arrowDown',
    status = 'normal',
    placeholder = 'placeholder',
    type = '',
    relevant = '',
  }) {
    const { page, name, context } = this;
    const pickerGroup = page.newGroup({ name });

    const internalStatus = content ? status : 'placeholder';
    const path = generatePath('picker', type, type === 'empty' ? 'hover' : internalStatus);
    const pickerInstance = this.getInstanceByPath(path);
    pickerGroup.sketchObject.addLayer(pickerInstance);

    pickerInstance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'content') && content) {
        pickerInstance.setValue_forOverridePoint_(String(content), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'placeholder') && !content) {
        pickerInstance.setValue_forOverridePoint_(String(placeholder), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon_arrow')) {
        let iconType;
        let iconStatus;
        if (type) {
          iconStatus = status === 'active' ? 'active' : 'normal';
          iconType = type === 'date' ? 'calendar' : 'time';
        } else {
          iconType = icon;
        }
        const iconPath = generatePath('icon', iconType, iconStatus);
        const iconInstance = this.getInstanceByPath(iconPath);
        pickerInstance.setValue_forOverridePoint_(iconInstance.symbolID(), overridePoint);
      }
      if (isOverridePointName(overridePoint, 'icon/empty')) {
        const iconInstance = this.getInstanceByPath('icon/empty');
        pickerInstance.setValue_forOverridePoint_(iconInstance.symbolID(), overridePoint);
      }
    });

    pickerGroup.adjustToFit();

    if (relevant) {
      const relevantComponent = createComponentInstance(context, relevant);
      const relevantInstance = relevantComponent.moveToGroup(pickerGroup);
      // FIXME: datepicker datelist property
      relevantInstance.frame().setY_(pickerGroup.frame.height + 10);
    }

    return pickerGroup;
  }
}

export default Picker;
