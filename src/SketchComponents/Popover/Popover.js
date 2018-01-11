import SketchComponent from '../SketchComponent';
import { isOverridePointName, getRectOfNativeLayer } from '../../utils';

const option = {
  name: 'popover',
};

class Popover extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ rect: { width, height }, showFooter }) {
    const { sketch, page, name } = this;

    const popoverGroup = page.newGroup({ name });
    const titleInstance = this.getInstanceByPath('popover/title/center');
    popoverGroup.sketchObject.addLayer(titleInstance);

    titleInstance.frame().setWidth_(width);
    titleInstance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'icon_close')) {
        const icon = this.getInstanceByPath('icon/close');
        titleInstance.setValue_forOverridePoint_(icon.symbolID(), overridePoint);
      }
    });

    popoverGroup.adjustToFit();

    const style = new sketch.Style();
    style.fills = ['#fff'];
    style.borders = ['#fff'];

    const footerHeight = showFooter ? getRectOfNativeLayer(titleInstance).height : 0;
    const contentGroup = popoverGroup.newGroup({ name: 'content' });
    contentGroup.newShape({
      name: 'content',
      frame: new sketch.Rectangle(
        0,
        popoverGroup.frame.height,
        width,
        height - popoverGroup.frame.height - footerHeight,
      ),
      style,
    });
    contentGroup.adjustToFit();

    popoverGroup.adjustToFit();

    if (showFooter) {
      const footerGroup = popoverGroup.newGroup({ name: 'footer' });
      footerGroup.newShape({
        name: 'footer',
        frame: new sketch.Rectangle(0, popoverGroup.frame.height, width, footerHeight),
        style,
      });
      footerGroup.adjustToFit();
      this.createDividerAtGroup(footerGroup, { y: 0 });
    }

    contentGroup.adjustToFit();
    popoverGroup.adjustToFit();
    this.createBgAtGroup(popoverGroup);
    this.createShadowAtGroup(popoverGroup);

    return popoverGroup;
  }
}

export default Popover;
