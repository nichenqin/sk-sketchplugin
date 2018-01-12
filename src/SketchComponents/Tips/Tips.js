import SketchComponent from '../SketchComponent';

const option = {
  name: 'tips',
};

class Tips extends SketchComponent {
  constructor(context, payload = { content: '', direction: 'up' }) {
    super(context, payload, option);
  }

  setPosition(target) {
    const { direction } = this.payload;

    const targetObject = target.sketchObject || target;
    const tipsInstance = this.layer.sketchObject;

    const x = (() => {
      switch (direction) {
        case 'left':
          return targetObject.frame().width() + 10;
        case 'right':
          return (tipsInstance.frame().width() + 10) * -1;

        default:
          return targetObject.frame().width() / 2 - tipsInstance.frame().width() / 2;
      }
    })();

    const y = (() => {
      switch (direction) {
        case 'up':
          return targetObject.frame().height() + 10;
        case 'down':
          return (tipsInstance.frame().height() + 10) * -1;

        default:
          return targetObject.frame().height() / 2 - tipsInstance.frame().height() / 2;
      }
    })();

    tipsInstance.frame().setX_(x);
    tipsInstance.frame().setY_(y);
    MSLayerMovement.moveToFront([tipsInstance]);
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
