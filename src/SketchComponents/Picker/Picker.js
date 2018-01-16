import SketchComponent from '../SketchComponent';
import {
  isOverridePointName,
  generatePath,
  createComponentInstance,
  setAlignment,
} from '../../utils';

const option = {
  name: 'picker',
};

class Picker extends SketchComponent {
  constructor(
    context,
    payload = {
      icon: 'arrowUp',
      status: 'active',
    },
  ) {
    super(context, payload, option);
  }

  import({
    content = '',
    icon = 'arrowDown',
    status = 'normal',
    placeholder = 'placeholder',
    relevant = {},
  }) {
    const { page, name, context } = this;
    const pickerGroup = page.newGroup({ name });

    const internalStatus = relevant.show && relevant.name ? 'active' : status;
    const path = generatePath('picker', content ? internalStatus : 'placeholder');
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
        if (relevant.show && relevant.name) {
          switch (relevant.name) {
            case 'datepicker':
              iconType = 'calendar';
              iconStatus = relevant.show ? 'active' : 'normal';
              break;
            case 'timepicker':
              iconType = 'time';
              iconStatus = relevant.show ? 'active' : 'normal';
              break;

            default:
              iconType = relevant.show ? 'arrowUp' : 'arrowDown';
              break;
          }
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

    if (relevant.show) {
      const relevantComponent = createComponentInstance(context, relevant.name);
      const relevantInstance = relevantComponent.moveToGroup(pickerGroup);
      // FIXME: datepicker datelist property
      relevantInstance.frame().setY_(pickerGroup.frame.height + 10);
      setAlignment(relevantInstance, pickerInstance, relevant.alignment);
    }

    return pickerGroup;
  }
}

export default Picker;
