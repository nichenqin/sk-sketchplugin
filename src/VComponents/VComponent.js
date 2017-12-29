import ContextManager from '../ContextManager';

class VComponent extends ContextManager {
  constructor(context, { name = '' } = {}) {
    super(context);
    this.name = name;
    this.uikit = this.sketch.resourceNamed(`${name}.sketch`);
  }

  copyWithLayer(layer) {
    const { sketchObject } = layer;
    const objectID = sketchObject.objectID();

    const newComponent = Object.assign(Object.create(Object.getPrototypeOf(this)), this, {
      objectID,
      sketchObject,
    });

    return newComponent;
  }

  import(path) {
    const instance = this.createSymbolInstanceByPath(path);

    this.addLayers([instance]);
  }
}

export default VComponent;
