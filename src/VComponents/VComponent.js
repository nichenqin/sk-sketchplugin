import ContextManager from '../ContextManager';

class VComponent extends ContextManager {
  constructor(context, payload, option = {}) {
    super(context);

    const name = option.name || '';

    this.identifier = 'superKit';
    this.option = option;
    this.name = name;
    this.uikit = this.sketch.resourceNamed(`${name}.sketch`);
    this.state = {};

    this.init(payload);
  }

  is(name) {
    return this.name.toLowerCase() === name.toLowerCase();
  }

  get isButton() {
    return this.is('button');
  }

  get isList() {
    return this.is('list');
  }

  get isText() {
    return this.is('text');
  }

  init(payload) {
    const target = this.import(payload);
    if (!target) {
      throw new Error('import function should return a layer like a group or a shape or a symbol instance');
    }

    const id = target.id || target.objectID();
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
    const component = this.updateObjectID(objectID);
    const newComponent = Object.assign(origin, component);

    return newComponent;
  }

  import() {
    throw new Error(`No import function defined: ${this.name}`);
  }
}

export default VComponent;
