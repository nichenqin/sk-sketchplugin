import VComponent from '../VComponents/VComponent';

class Store {
  constructor() {
    this.components = {};
  }

  /**
   * add a component
   *
   * @param {VComponent} component
   * @memberof Store
   */
  add(component) {
    if (!(component instanceof VComponent)) {
      throw new Error('component should be an instance of VComponent');
    }
    this.components[component.objectID] = component;
  }

  getComponentByID(objectID) {
    return this.components[objectID];
  }

  removeByID(objectID) {
    const component = this.components[objectID];
    if (!component) {
      throw new Error('component not found');
    }
    delete this.components[objectID];
    return component;
  }

  clear() {
    this.components = {};
  }
}

export default Store;
