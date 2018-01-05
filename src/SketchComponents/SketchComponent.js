import ContextManager from '../ContextManager';
import store from '../store';

class SketchComponent extends ContextManager {
  constructor(context, payload, option = {}) {
    super(context);

    const name = option.name || '';

    this.identifier = 'superKit';
    this.option = option;
    this.name = name;
    this.uikit = this.sketch.resourceNamed(`${name}.sketch`);

    this.payload = payload;
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
    if (this.componentWillImport) {
      this.componentWillImport(payload);
    }

    const target = this.import.call(this, payload);
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

    if (this.componentDidSelected) {
      this.componentDidSelected(payload);
    }
  }

  remove() {
    const { layer, objectID } = this;
    layer.remove();
    store.delete(objectID);
  }

  copyWithLayer(layer) {
    const newLayer = layer.duplicate();
    const newObjectID = String(newLayer.id);

    const origin = Object.create(Object.getPrototypeOf(this));
    const newComponent = Object.assign(origin, this);
    newComponent.updateObjectID(newObjectID);

    const data = { layer: newLayer, component: newComponent, payload: this.payload };
    store.set(newObjectID, data);

    if (typeof newLayer.select === 'function') {
      newLayer.select();
    } else {
      newLayer.sketchObject.select_byExpandingSelection(true, false);
    }
    return newComponent;
  }

  import() {
    throw new Error(`No import function defined: ${this.name}`);
  }
}

export default SketchComponent;
