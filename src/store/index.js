import VComponent from '../VComponents/VComponent';

const store = (() => {
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

    /**
     *  get length of components in store
     *
     * @returns {number}
     * @memberof Store
     */
    size() {
      return Object.keys(this.components).length;
    }

    /**
     * get component by objectID
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

    /**
     * remove component from the store
     *
     * @param {any} objectID
     * @returns {VComponent}
     * @memberof Store
     */
    removeByID(objectID) {
      const component = this.components[objectID];
      if (!component) {
        throw new Error('component not found');
      }
      delete this.components[objectID];
      return component;
    }

    /**
     * remove all components in store
     *
     * @memberof Store
     */
    clear() {
      this.components = {};
    }
  }

  return new Store();
})();

export default store;
