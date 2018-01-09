import SketchComponent from '../SketchComponent';
import { isOverridePointName } from '../../utils';

const option = {
  name: 'popover',
};

class Popover extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import({ rect: { width, height } }) {
    const { sketch, page, name } = this;

    const popoverGroup = page.newGroup({ name });
    const titleInstance = this.createSymbolInstanceByPath('popover/title/center');
    popoverGroup.sketchObject.addLayer(titleInstance);

    titleInstance.frame().setWidth_(width);
    titleInstance.overridePoints().forEach(overridePoint => {
      if (isOverridePointName(overridePoint, 'icon_close')) {
        const icon = this.createSymbolInstanceByPath('icon/close');
        titleInstance.setValue_forOverridePoint_(icon.symbolID(), overridePoint);
      }
    });

    popoverGroup.adjustToFit();

    const style = new sketch.Style();
    style.fills = ['#fff'];
    style.borders = ['#fff'];

    popoverGroup.newShape({
      name: 'content',
      frame: new sketch.Rectangle(
        0,
        popoverGroup.frame.height,
        width,
        height - popoverGroup.frame.height,
      ),
      style,
    });

    popoverGroup.adjustToFit();
    this.createBgAtGroup(popoverGroup);
    this.createShadowAtGroup(popoverGroup);

    return popoverGroup;
  }
}

export default Popover;
