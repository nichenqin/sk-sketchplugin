import ContextManager from '../ContextManager';

class VComponent extends ContextManager {
  constructor(context, { name = '' } = {}) {
    super(context);
    this.name = name;
    this.uikit = this.sketch.resourceNamed(`${name}.sketch`);
  }

  import(path) {
    const instance = this.createSymbolInstanceByPath(path);

    this.addLayers([instance]);
  }
}

export default VComponent;
