import ContextManager from '../ContextManager';

class VComponent extends ContextManager {
  constructor(context, option = {}) {
    super(context);
    this.option = option;
    this.name = option.name;
    this.uikit = this.sketch.resourceNamed(`${option.name}.sketch`);
    this.state = {};
  }

  setState(state) {
    Object.keys(state).forEach(key => {
      const value = state[key];
      this.state[key] = value;
    });

    return this.state;
  }

  copyWithLayer(layer) {
    const { sketchObject } = layer;
    const objectID = sketchObject.objectID();

    const origin = Object.create(Object.getPrototypeOf(this));
    const component = this.updateObjectID(objectID).updateSketchObject(sketchObject);
    const newComponent = Object.assign(origin, component);

    return newComponent;
  }

  import() {
    throw new Error(`No import function defined: ${this.name}`);
  }
}

export default VComponent;
