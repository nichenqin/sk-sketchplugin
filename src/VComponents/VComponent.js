import ContextManager from '../ContextManager';
import store from '../store';

class VComponent extends ContextManager {
  constructor(context, payload, option = {}) {
    super(context);

    const name = option.name || '';

    this.identifier = 'superKit';
    this.option = option;
    this.name = name;
    this.uikit = this.sketch.resourceNamed(`${name}.sketch`);
    this.state = {};

    this.payload = payload;
    this.init();
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

  init() {
    const { payload } = this;
    const target = this.import(payload);
    if (!target) {
      throw new Error('import function should return a layer like a group or a shape or a symbol instance');
    }

    const id = target.id || target.objectID();
    this.updateObjectID(id);

    const { objectID, layer } = this;
    const data = { layer, payload, component: this };

    store.set(objectID, data);

    if (typeof target.select === 'function') {
      target.select();
    } else {
      this.layer.select();
    }
  }

  remove() {
    const { layer, objectID } = this;
    layer.remove();
    store.delete(objectID);
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

    const newLayer = layer.duplicate();

    const data = { layer: newLayer, component: newComponent, payload: this.payload };
    store.set(String(newLayer.id), data);

    newLayer.select();
    return newComponent;
  }

  import() {
    throw new Error(`No import function defined: ${this.name}`);
  }
}

export default VComponent;
