class Store {
  constructor() {
    this.components = [];
  }

  add(component) {
    this.components.unshift(component);
  }

  remove() {
    return this.components.pop();
  }

  clear() {
    this.components = [];
  }
}

export default Store;
