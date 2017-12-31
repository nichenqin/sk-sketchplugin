import ContextManager from '../ContextManager';

class VComponent extends ContextManager {
  constructor(context, payload, option = {}) {
    super(context);

    const name = option.name || '';

    this.option = option;
    this.name = name.toLowerCase();
    this.uikit = this.sketch.resourceNamed(`${name}.sketch`);
    this.state = {};

    this.init(payload);
  }

  get isButton() {
    return this.name === 'button';
  }

  get isList() {
    return this.name === 'list';
  }

  get isText() {
    return this.name === 'text';
  }

  init(payload) {
    const target = this.import(payload);
    if (!target) {
      throw new Error('import function should return something like group or symbol instance');
    }

    const id = target.id || target.sketchObject.objectID();
    this.updateObjectID(id);

    // TODO: add root component to store

    if (typeof target.select === 'function') {
      target.select();
    } else {
      this.layer.select();
    }
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
