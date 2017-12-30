import ContextManager from '../ContextManager';

class VComponent extends ContextManager {
  constructor(context, { name = '' } = {}) {
    super(context);
    this.name = name;
    this.uikit = this.sketch.resourceNamed(`${name}.sketch`);
    this.state = {};
  }

  setState(state) {
    Object.keys(state).forEach(key => {
      const value = state[key];
      this.state[key] = value;
    });
  }

  copyWithLayer(layer) {
    const { sketchObject } = layer;
    const objectID = sketchObject.objectID();

    const origin = Object.create(Object.getPrototypeOf(this));
    const componet = this.updateObjectID(objectID).updateSketchObject(sketchObject);
    const newComponent = Object.assign(origin, componet);

    return newComponent;
  }

  import(payload) {
    const instance = this.createSymbolInstanceByPath(payload);

    this.addLayers([instance]);
  }
}

export default VComponent;
