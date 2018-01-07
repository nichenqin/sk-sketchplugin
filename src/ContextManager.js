/* globals MSUserAssetLibrary MSForeignSymbol */
class ContextManage {
  constructor(context) {
    this.context = context;
    this.sketch = context.api();

    this.assetLibrary = null;

    this.objectID = '';
    this.allSymbols = null;
    this.symbolLibrary = {};
  }

  get layer() {
    if (!this.objectID) return null;
    return this.getLayerByID(this.objectID);
  }

  get sketchObject() {
    return this.layer.sketchObject;
  }

  get document() {
    return this.sketch.selectedDocument;
  }

  get page() {
    return this.document.selectedPage;
  }

  get selection() {
    return this.document.selectedLayers;
  }

  get nativeLayers() {
    return this.selection.nativeLayers;
  }

  getSelectedLayerInfo() {
    const { selection } = this;

    let layerName = '';
    let objectID = '';
    selection.iterate(layer => {
      layerName = String(layer.name);
      objectID = String(layer.id);
    });

    return { layerName, objectID };
  }

  getLayerByID(objectID) {
    const { document } = this;

    if (!objectID) {
      throw new Error('objectID required');
    }

    const layer = document.layerWithID(objectID);
    if (!layer) {
      throw new Error(`layer not found with objectID: ${objectID}`);
    }

    return layer;
  }

  updateObjectID(objectID) {
    this.objectID = String(objectID);
    return this;
  }

  getSymbolsFromLibrary() {
    const { uikit } = this;

    if (!this.assetLibrary) {
      if (!uikit) {
        throw new Error('uikit required');
      }

      const assetLibrary = MSUserAssetLibrary.alloc().initWithDocumentAtURL(uikit);

      if (!assetLibrary) {
        throw new Error('asset library not found');
      }

      assetLibrary.loadSynchronously();
      this.assetLibrary = assetLibrary;
    }

    const symbols = this.assetLibrary.document().allSymbols();
    this.allSymbols = symbols;
    return symbols;
  }

  getSymbolByPath(path) {
    const symbols = this.allSymbols || this.getSymbolsFromLibrary();
    if (!symbols.count()) {
      throw new Error('Tried to open library but no symbol found inside the file');
    }

    let symbol = null;
    for (let i = 0; i < symbols.count(); i += 1) {
      const symbolName = String(symbols[i].name());
      if (path === symbolName) {
        symbol = symbols[i];
        break;
      }
    }
    this.symbolLibrary[path] = symbol;
    return symbol;
  }

  /**
   * create a symbol instance from user asset library
   *
   * @param {string} path
   * @returns {MSSymbolInstance}
   * @memberof ContextManage
   */
  createSymbolInstanceByPath(path) {
    const { context, assetLibrary } = this;

    if (!path) {
      throw new Error('path required');
    }

    const symbol = this.symbolLibrary[path] || this.getSymbolByPath(path);
    if (!symbol) {
      throw new Error(`symbol not found in path: ${path}`);
    }

    const foreignSymbol = MSForeignSymbol.foreignSymbolWithMaster_inLibrary(symbol, assetLibrary);
    context.document.documentData().addForeignSymbol(foreignSymbol);

    const symbolMaster = foreignSymbol.symbolMaster();
    const instance = symbolMaster.newSymbolInstance();

    return instance;
  }

  /**
   * create a bg rectangle inside a group
   *
   * @param {object} group
   * @returns {object}
   * @memberof ContextManage
   */
  createBgAtGroup(group) {
    if (!group.isGroup) {
      throw new Error('shape should be added inside a group');
    }

    const { sketch } = this;
    const style = new sketch.Style();
    style.fills = ['#ffffff'];
    style.borders = ['rgba(0,0,0,0)'];

    const { width, height } = group.frame;

    const bg = group.newShape({
      name: 'bg',
      frame: new sketch.Rectangle(0, 0, width, height),
      style,
    });
    bg.moveToBack();

    return bg;
  }

  /**
   *
   *
   * @param {object} group
   * @param {object} [{ color = '#ddd', name = 'divider' }={}]
   * @returns {object}
   * @memberof ContextManage
   */
  createDividerAtGroup(group, { color = '#ddd', name = 'divider' } = {}) {
    if (!group.isGroup) {
      throw new Error('shape should be added inside a group');
    }

    const { sketch } = this;
    const style = new sketch.Style();
    style.borders = [color];

    const { width, height } = group.frame;

    const divider = group.newShape({
      name,
      frame: new sketch.Rectangle(0, height, width, 0.5),
      style,
    });

    return divider;
  }

  createShadowAtGroup(group, { color = 'rgba(0, 0, 0, 0.1)' } = {}) {
    if (!group.isGroup) {
      throw new Error('shape should be added inside a group');
    }

    const { sketch } = this;
    const style = new sketch.Style();
    const msColor = style.colorFromString(color);

    const shadow = group.sketchObject.style().addStylePartOfType(2);
    shadow.setColor(msColor);
    shadow.offsetX = 0;
    shadow.offsetY = 2;
    shadow.blurRadius = 15;
  }
}

export default ContextManage;
