import SketchComponent from '../SketchComponent';

const option = {
  name: 'popover',
};

class Popover extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import() {
    const { page, name } = this;

    const popoverGroup = page.newGroup({ name });
    const titleInstance = this.createSymbolInstanceByPath('popover/title/center');
    popoverGroup.sketchObject.addLayer(titleInstance);

    return popoverGroup;
  }
}

export default Popover;
