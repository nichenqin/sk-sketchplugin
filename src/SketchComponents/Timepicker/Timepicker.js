import SketchComponent from '../SketchComponent';

const option = {
  name: 'timepicker',
};

class Timepicker extends SketchComponent {
  constructor(context, payload) {
    super(context, payload, option);
  }

  import() {
    const { page, name } = this;

    const rootGroup = page.newGroup({ name });

    const timepickerInstance = this.createSymbolInstanceByPath('timepicker/body');
    rootGroup.sketchObject.addLayer(timepickerInstance);

    rootGroup.adjustToFit();
    this.createBgAtGroup(rootGroup);
    this.createShadowAtGroup(rootGroup);

    return rootGroup;
  }
}

export default Timepicker;
