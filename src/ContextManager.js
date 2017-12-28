/* globals MSUserAssetLibrary NSApp */

class ContextManage {
  constructor(context) {
    this.context = context;
    this.sketch = context.api();
    this.objectID = '';

    this.assetLibrary = null;

    this.symbolMaster = null;
    this.symbolInstance = null;
    this.children = null;
    this.objectID = '';
  }

  get layer() {
    if (!this.objectID) return null;
    return this.getLayerByID(this.objectID);
  }

  get document() {
    return this.sketch.selectedDocument;
  }

  get page() {
    return this.document.selectedPage;
  }

  get selection() {
    return this.document.selecetdLayers;
  }

  getSelectedLayerInfo() {
    const { selection } = this;

    let layerName = '';
    let objectID = '';
    selection.iterate(layer => {
      layerName = String(layer.name);
      objectID = String(layer.id);
    });
    this.updateObjectID(objectID);

    return { layerName, objectID };
  }

  getLayerByID(objectID) {
    const { document, sketch } = this;

    if (!objectID) {
      sketch.message('objectID required');
      return false;
    }

    const layer = document.layerWithID(objectID);
    if (!layer) {
      sketch.message(`layer not found through objectID: ${objectID}`);
    }

    this.updateObjectID(objectID);

    return layer;
  }

  getSketchObjectByID(objectID) {
    const layer = this.getLayerByID(objectID);
    return layer.sketchObject;
  }

  updateObjectID(objectID) {
    this.objectID = objectID;
  }

  getSymbolsFromLibrary() {
    const { sketch, uikit } = this;

    if (!uikit) {
      sketch.message('uikit required');
      return false;
    }

    const assetLibrary = MSUserAssetLibrary.alloc().initWithDocumentAtURL(uikit);

    if (!assetLibrary) {
      sketch.alert('没有找到library', `文件路径${uikit}`);
      return false;
    }

    this.assetLibrary = assetLibrary;
    assetLibrary.loadSynchronously();

    const symbols = assetLibrary.document().allSymbols();
    return symbols;
  }

  getSymbolByPath(path) {
    const { sketch } = this;
    const symbols = this.getSymbolsFromLibrary();

    if (!symbols.count()) {
      sketch.message('Tried to open library but no symbol found inside the file');
      return false;
    }

    let symbol = null;

    for (let i = 0; i < symbols.count(); i += 1) {
      const symbolName = String(symbols[i].name());
      if (path === symbolName) {
        symbol = symbols[i];
        break;
      }
    }

    return symbol;
  }

  createSymbolInstanceByPath(path) {
    const { context, assetLibrary, sketch } = this;

    if (!path) {
      sketch.message('path required');
      return false;
    }

    const symbol = this.getSymbolByPath(path);

    if (!symbol) {
      sketch.message(`symbol not found in path: ${path}`);
      return false;
    }

    this.symbolMaster = symbol;
    this.children = symbol.layers();

    const assetLibraryController = NSApp.delegate().librariesController();
    const documentData = context.document.documentData();
    const importedSymbol = assetLibraryController.importForeignSymbol_fromLibrary_intoDocument(
      symbol,
      assetLibrary,
      documentData,
    );

    const instance = importedSymbol.symbolMaster().newSymbolInstance();
    this.objectID = String(instance.objectID());
    this.symbolInstance = instance;

    return instance;
  }

  detach() {
    const layer = this.symbolInstance.detachByReplacingWithGroup();

    this.updateObjectID(layer.objectID());

    return layer;
  }

  addLayers(instances) {
    const { context } = this;

    context.document.currentPage().addLayers(instances);
  }
}

export default ContextManage;
