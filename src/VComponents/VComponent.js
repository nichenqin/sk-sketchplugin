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

    const origin = Object.create(Object.getPrototypeOf(this));
    const componet = this.updateObjectID(objectID).updateSketchObject(sketchObject);
    const newComponent = Object.assign(origin, componet);

    return newComponent;
  }

  importToSektch(payload) {
    const instance = this.createSymbolInstanceByPath(payload);

    this.addLayers([instance]);
  }
}

export default VComponent;
