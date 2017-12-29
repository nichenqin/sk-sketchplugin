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

    if (!component.objectID) {
      throw new Error('no objectID in component object, maybe you has not imported it to sketch context');
    }

    this.components[component.objectID] = component;
  }

  size() {
    return Object.keys(this.components).length;
  }

  /**
   *
   *
   * @param {string} objectID
   * @returns {VComponent} an instance of VComponent
   * @memberof Store
   */
  getByID(objectID) {
    const component = this.components[objectID];
    if (!component) {
      throw new Error('component not found');
    }
    return component;
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
