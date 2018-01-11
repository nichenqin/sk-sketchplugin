import SketchComponent from '../SketchComponent';

const option = {
  name: 'tips',
};

class Tips extends SketchComponent {
  constructor(context, payload = { direction: 'up' }) {
    super(context, payload, option);
  }

  import({ content = '', direction = 'up' }) {
    const { document } = this;

    const tipsInstance = this.getInstanceByPath(`tips/${direction}`);
    document.sketchObject.addLayer(tipsInstance);

    tipsInstance.overridePoints().forEach(overridePoint => {
      if (content) {
        tipsInstance.setValue_forOverridePoint_(String(content), overridePoint);
      }
    });

    return tipsInstance;
  }
}

export default Tips;
